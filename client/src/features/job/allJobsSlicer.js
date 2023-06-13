import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./getAllJobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async (_, thunkAPI) => {
    return getAllJobsThunk(_, thunkAPI);
  }
);

export const showStats = createAsyncThunk(
  "job/showStats",
  async (_, thunkAPI) => {
    let url = "/jobs/stats";
    return showStatsThunk(url, thunkAPI);
  }
);

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

    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    handleFilters: (state, { payload }) => {
      state.page = 1;
      state[payload.name] = payload.value;
    },
    changePrev: (state) => {
      state.page -= 1;
    },
    changeNext: (state) => {
      state.page += 1;
    },
    activePage: (state, action) => {
      state.page = action.payload;
    },
    clearAllJobs: (state) => {
      return initialState;
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
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export const {
  showLoading,
  hideLoading,
  clearAllJobs,
  clearFilters,
  handleFilters,
  changePrev,
  changeNext,
  activePage,
} = allJobsSlicer.actions;
export default allJobsSlicer.reducer;
