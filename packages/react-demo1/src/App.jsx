import React, { useEffect } from 'react';
// import Styles from './app.module.scss'; // 不报错
// import './app.scss'; // 不带hash
// import './root.css'; // 直接报错
import Layout from 'src/layout/index';
import { login } from 'src/service/index';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from 'src/store/user';

export default function App() {
  const userInfo = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();

  useEffect(() => {
    login({}).then((res) => {
      // dispatch(setUserInfo(res));
    });
  }, []);
  return <Layout></Layout>;
}
