import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    return createJobThunk("jobs", jobData, thunkAPI);
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (data, thunkAPI) => {
    let url = `/jobs/${data.editJobId}`;
    return editJobThunk(url, data, thunkAPI);
  }
);
export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id, thunkAPI) => {
    let url = `/jobs/${id}`;
    return deleteJobThunk(url, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "pending", "declined"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlicer = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJob: (state) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    handleJobInput: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(
          `New job posted:  ${action.payload.position} at ${action.payload.company} `
        );
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {})
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        toast.success(
          `Job updated: ${payload.data.updatedJob.position} @ ${payload.data.updatedJob.company}`
        );
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }),
});

export const { clearJob, handleJobInput, setEditJob } = jobSlicer.actions;
export default jobSlicer.reducer;
