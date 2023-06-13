import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlicer";
import { hideLoading } from "./allJobsSlicer";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { searchStatus, searchType, sort, search, page } =
    thunkAPI.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&search=${search}`;
  }
  console.log(url);
  try {
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

export const showStatsThunk = async (url, thunkAPI) => {
  try {
    const {
      data: { defaultStats, monthlyApplications },
    } = await customFetch.get(url);

    return { defaultStats, monthlyApplications };
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Not authorized. Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.message.data.msg);
  }
};
