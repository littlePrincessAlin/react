import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const headMenu = [
  {
    key: 'home',
    label: '个人主页',
  },
];
// 侧边栏菜单
export const siderMenu = [
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
