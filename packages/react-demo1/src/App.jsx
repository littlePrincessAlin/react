import React, { useState, useEffect } from 'react';
// import Styles from './app.module.scss'; // 不报错
// import './app.scss'; // 不带hash
// import './root.css'; // 直接报错
import Layout from 'src/layout/index';
import { login } from 'src/service/index';

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    login({});
  }, []);
  return <Layout></Layout>;
}
