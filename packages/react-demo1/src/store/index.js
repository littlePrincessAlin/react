import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';

// 创建store
const store = configureStore({
  reducer: userSlice,
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));

// Still pass action objects to `dispatch`, but they're created for us
store.dispatch(incremented());
// {value: 1}
store.dispatch(incremented());
// {value: 2}
store.dispatch(decremented());
// {value: 1}

export default store;
