import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob, setEditJob } from "../features/job/jobSlicer";
import JobInfo from "./JobInfo";
import moment from "moment/moment";

const Job = ({
  _id,
  company,
  position,
  jobLocation,
  jobType,
  status,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("DD-MM-YYYY");

  const editJob = () => {
    dispatch(
      setEditJob({
        editJobId: _id,
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
    );
  };
  const handleDelete = () => {
    dispatch(deleteJob(_id));
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick={editJob}>
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
