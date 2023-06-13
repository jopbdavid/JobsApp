import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "../user/userSlicer";
import { hideLoading } from "./allJobsSlicer";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { searchStatus, searchType, sort, search, page } =
    thunkAPI.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&search=${search}`;
  }

  try {
    const {
      data: { jobs, numOfPages, totalJobs },
    } = await customFetch.get(url);
    return { jobs, numOfPages, totalJobs };
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (url, thunkAPI) => {
  try {
    const {
      data: { defaultStats, monthlyApplications },
    } = await customFetch.get(url);

    return { defaultStats, monthlyApplications };
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
