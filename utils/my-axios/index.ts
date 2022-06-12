import { AxiosResponse } from 'axios';
import { useToast } from '@chakra-ui/react';
import Request from './request';

import type { RequestConfig } from './request/types';

export interface YWZResponse<T> {
  // statusCode: number
  // desc: string
  code: number;
  msg: string;
  data: T;
}

// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse<R>> {
  data?: T;
}
const toast = useToast();
const request = new Request({
  baseURL: '/api/v1',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      // console.log('实例请求拦截器')
      if (config.method === 'put' || config.method === 'delete') {
        const id = config.data._id || config.data.id;
        config.url = config.url + `/${id}`;
      }
      //console.log('config', config);
      const token = localStorage.getItem('token');
      config.headers = {
        Authorization: 'Bearer ' + token,
        ...config.headers,
      };
      return config;
    },
    // 请求错误拦截
    requestInterceptorsCatch: () => {},
    // 响应拦截器
    responseInterceptors: (res: AxiosResponse) => {
      // console.log('实例响应拦截器')
      console.log('result-------', res);
      return res;
    },
    // 响应错误拦截
    responseInterceptorsCatch: error => {
      // console.log('实例错误拦截器', error);
      console.log('error===', error.response); // 注意这里必须打印error.response
      const response = error.response;
      if (response && response.status) {
        if (response.status === 403) {
          // location.href = '/403';
          cancelAllRequest();
          location.href = '/#/admin/login';
          toast({
            position: 'top',
            title: '权限错误',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else if (response.status === 401) {
          // location.href = '/401';
          cancelAllRequest();
          location.href = '/#/admin/login';
          toast({
            position: 'top',
            title: '权限错误',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else if (response.data.error) {
          toast({
            position: 'top',
            title: response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    // 将data数据挂载到params
    config.params = config.data;
  }
  return request.request<YWZResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default ywzRequest;
