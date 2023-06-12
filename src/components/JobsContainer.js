import React from "react";
import SearchContainer from "./SearchContainer";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllJobs } from "../features/job/allJobsSlicer";
import Loading from "./Loading";

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs available...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>{totalJobs} jobs found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
