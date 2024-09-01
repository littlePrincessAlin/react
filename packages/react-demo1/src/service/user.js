import { fetchApi } from 'src/utils/index';

// 登陆注册接口
export const login = (params) => {
  return fetchApi({
    url: '/api/user/login',
    params,
  });
};
