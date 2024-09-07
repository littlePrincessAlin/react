import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';

// 创建store
const store = configureStore({
  reducer: userSlice,
});

export default store;
