import { fetchApi } from 'src/utils/index';

// 登陆接口
export const login = (params) => {
  return fetchApi({
    method: 'post',
    url: '/api/user/login',
    params,
  });
};
// 注册接口
export const register = (params) => {
  return fetchApi({
    method: 'post',
    url: '/api/user/register',
    params,
  });
};
// 权限与用户信息
export const permission = (params) => {
  return fetchApi({
    method: 'post',
    url: '/api/user/permission',
    params,
  });
};
