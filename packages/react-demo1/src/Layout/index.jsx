import React from 'react';
import Styles from './index.module.scss';
import Router from 'src/router/index';
import { siderMenu, headMenu } from './menu';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

export default function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className={Styles.app}>
      <Header className={Styles.app__header}>
        <div className={Styles.demo__logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={'home'}
          items={headMenu}
          className={Styles['app__header--menu']}
        />
        <div className={Styles.login}>登陆</div>
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
            <Router />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
