import request, { cancelRequest, cancelAllRequest } from './index';

interface Req {
  apiKey: string;
  area?: string;
  areaID?: string;
}
interface Res {
  area: string;
  areaCode: string;
  areaid: string;
  dayList: any[];
}

const get15DaysWeatherByArea = (data: Req) => {
  return request<Req, Res>({
    url: '/api/common/weather/get15DaysWeatherByArea',
    method: 'GET',
    data,
    interceptors: {
      requestInterceptors(res) {
        console.log('接口请求拦截');
        return res;
      },
      responseInterceptors(result) {
        console.log('接口响应拦截');
        return result;
      },
    },
  });
};

(async () => {
  const res = await get15DaysWeatherByArea({
    apiKey: 'import.meta.env.VITE_APP_KEY',
    area: '北京市',
  });
  console.log(res.data.dayList);
  /**
   * 输出：
   * 接口请求拦截
   * 实例请求拦截器
   * 全局请求拦截器
   * 实例响应拦截器
   * 全局响应拦截器
   * 接口响应拦截
   * [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   */
  cancelRequest('/api/common/weather/get15DaysWeatherByArea'); // 模拟点击取消某请求
  cancelAllRequest(); // 模拟点击取消所有请求
})();
