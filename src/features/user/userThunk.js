import customFetch from "../../utils/axios";
import { clearAllJobs } from "../job/allJobsSlicer";
import { clearJob } from "../job/jobSlicer";
import { logoutUser } from "./userSlicer";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.post(url, user);
    const userData = data.user;
    thunkAPI.dispatch(clearJob());

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

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearJob());
    thunkAPI.dispatch(clearAllJobs());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
