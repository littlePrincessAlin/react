import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home/index';
// import Lilin from 'pages/Lilin/index';
import Login from 'pages/Login/index';

// 如果登陆了，直接重定向到home页
const redirectIfUser = () => {
  return null;
};

// 路由
const routes = [
  {
    path: '/',
    element: <Login></Login>,
    loader: redirectIfUser,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
];
const router = createBrowserRouter(routes);
console.log('router', router);

export default function Router() {
  return <RouterProvider router={router} />;
}
