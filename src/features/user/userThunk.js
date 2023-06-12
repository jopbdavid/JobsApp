import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlicer";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);
    const userData = data.user;

    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);
    const newUser = data.user;
    return newUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    // const headers = {
    //   authorization: `Bearer ${user.token}`,
    // };
    const { data } = await customFetch.patch(url, user);
    return data.user;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
