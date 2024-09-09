import axios from 'axios';

const instance = axios.create({
  timeout: 1000,
  headers: {},
});

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { code, data } = response?.data || {};
    if (code === 1) {
      return data;
    } else {
      return Promise.reject(response?.data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export const fetchApi = ({ method, url, params }) => {
  return instance({
    method: method || 'get',
    url,
    [method === 'get' ? 'params' : 'data']: params,
  });
};
