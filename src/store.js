import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./features/user/userSlicer";
import jobSlicer from "./features/job/jobSlicer";
import allJobsSlicer from "./features/job/allJobsSlicer";

export const store = configureStore({
  reducer: {
    user: userSlicer,
    job: jobSlicer,
    allJobs: allJobsSlicer,
  },
});
