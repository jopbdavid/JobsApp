import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import {
  clearJob,
  createJob,
  editJob,
  handleJobInput,
} from "../../features/job/jobSlicer";

const AddJob = () => {
  const {
    isEditing,
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields.");
    }
    if (isEditing) {
      return dispatch(
        editJob({ editJobId, position, company, jobLocation, status, jobType })
      );
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleJobInput({ name, value }));
  };

  const handleClear = () => {
    dispatch(clearJob());
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleJobInput({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit job" : "Add job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            values={position}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="company"
            values={company}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            values={jobLocation}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="status"
            values={status}
            options={statusOptions}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Job Type"
            name="jobType"
            values={jobType}
            options={jobTypeOptions}
            handleChange={handleChange}
          />
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {!isLoading ? "Submit" : "Loading..."}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
