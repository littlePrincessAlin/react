import React from 'react';
import Styles from './app.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from 'pages/Home/index';
import Lilin from 'pages/Lilin/index';
// import './app.scss'; // 不带hash
// import './root.css'; // 直接报错
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
const routes = [
  {
    path: '/',
    element: <Home></Home>,
    key: 'home',
    label: '个人主页',
  },
  {
    path: '/test',
    element: <Lilin></Lilin>,
    key: 'lilin',
    label: '测试测试',
  },
];
const siderMenu = [
  {
    key: 'homePage',
    icon: React.createElement(LaptopOutlined),
    label: '我的主页',
    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   };
    // }),
  },
];
const router = createBrowserRouter(routes);
console.log('router', router, siderMenu);

export default function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className={Styles.app}>
      <Header className={Styles.app__header}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={'home'}
          items={routes}
          className={Styles['app__header--menu']}
        />
      </Header>
      <Layout>
        {siderMenu && (
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              items={siderMenu}
              className={Styles.app__sider__menu}
            />
          </Sider>
        )}
        <Layout className={Styles.app__breadLayout}>
          <Breadcrumb
            className={Styles.app__bread}
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
          ></Breadcrumb>
          <Content
            className={Styles.app__content}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <RouterProvider router={router} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
