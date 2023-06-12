import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlicer";
import { hideLoading } from "./allJobsSlicer";

export const getAllJobsThunk = async (url, thunkAPI) => {
  try {
    // const {
    //   user: {
    //     user: { token },
    //   },
    // } = thunkAPI.getState();
    // const headers = {
    //   authorization: `Bearer ${token}`,
    // };
    const {
      data: { jobs, numOfPages, totalJobs },
    } = await customFetch.get(url);
    return { jobs, numOfPages, totalJobs };
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
