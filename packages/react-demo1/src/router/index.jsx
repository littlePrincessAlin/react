import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import ErrorPage from 'pages/ErrorPage/index';
import Login from 'pages/Login/index';
import Layout from 'pages/Layout/index';
import { permission } from 'src/service/index';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from 'src/store/user';
import { pageRoutes } from './pageRoutes';

export default function Router() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  // 如果登陆了，直接重定向到home页；如果未登陆，重定向到login页
  const redirectIfUser = async () => {
    if (userInfo) return null;
    try {
      const { data, code } = await permission();
      if (data) {
        dispatch(setUserInfo(data));
      }
    } catch (error) {
      console.log('error', error);
      // 重定向到登陆页面
      return redirect('/login');
    }

    return null;
  };
  const redirectIfHasUser = () => {
    if (userInfo) {
      return redirect('/home');
    }
    return null;
  };

  // 根路由
  const rootRoute = [
    {
      path: '/login',
      element: <Login></Login>,
      errorElement: <ErrorPage />,
      loader: redirectIfHasUser,
    },
    {
      path: '/',
      element: <Layout></Layout>,
      errorElement: <ErrorPage />,
      loader: redirectIfUser,
      children: pageRoutes,
    },
  ];

  const router = createBrowserRouter(rootRoute);
  console.log('router11', router);

  return <RouterProvider router={router} />;
}
