import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./features/user/userSlicer";
export const store = configureStore({
  reducer: {
    user: userSlicer,
  },
});
