import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getAllJobsThunk } from "./getAllJobsThunk";

export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async (_, thunkAPI) => {
    let url = "/jobs";
    return getAllJobsThunk(url, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  status: {},
};

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const allJobsSlicer = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (state, { payload: { jobs, numOfPages, totalJobs } }) => {
          state.isLoading = false;
          state.jobs = jobs;
          state.numOfPages = numOfPages;
          state.totalJobs = totalJobs;
        }
      )
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export const { showLoading, hideLoading } = allJobsSlicer.actions;
export default allJobsSlicer.reducer;
