import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

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
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
