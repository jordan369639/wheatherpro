import { configureStore } from '@reduxjs/toolkit';

import LoginLogout from './LoginLogout';

export const store = configureStore({
  reducer: {
    user:LoginLogout,
  },
});
