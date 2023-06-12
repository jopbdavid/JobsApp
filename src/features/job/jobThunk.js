import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlicer";
import { clearJob } from "./jobSlicer";
import { showLoading, getAllJobs, hideLoading } from "./allJobsSlicer";

export const createJobThunk = async (url, jobData, thunkAPI) => {
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
      data: { job },
    } = await customFetch.post(url, jobData);
    thunkAPI.dispatch(clearJob());
    return job;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (url, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    // const {
    //   user: {
    //     user: { token },
    //   },
    // } = thunkAPI.getState();
    // const headers = {
    //   authorization: `Bearer ${token}`,
    // };

    const data = await customFetch.delete(url);
    thunkAPI.dispatch(getAllJobs());
    return data.data.msg;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async (url, job, thunkAPI) => {
  try {
    // const {
    //   user: {
    //     user: { token },
    //   },
    // } = thunkAPI.getState();
    // const headers = {
    //   authorization: `Bearer ${token}`,
    // };
    const updatedJob = await customFetch.patch(url, job);
    thunkAPI.dispatch(clearJob());
    return updatedJob;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
