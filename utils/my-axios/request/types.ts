import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface AxiosInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AxiosInterceptors<T>
}
export interface CancelRequestSource {
  [index: string]: () => void
}