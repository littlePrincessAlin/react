import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
      // 它实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
      state.value = action;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
