import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  getAllJobs,
  handleFilters,
} from "../features/job/allJobsSlicer";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const jobSearchOptions = ["all", ...jobTypeOptions];
  const jobStatusOptions = ["all", ...statusOptions];

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (isLoading) {
      return;
    }
    dispatch(handleFilters({ name, value }));
  };
  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            values={search}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            labelText="status"
            name="searchStatus"
            values={searchStatus}
            options={jobStatusOptions}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            labelText="type"
            name="searchType"
            values={searchType}
            options={jobSearchOptions}
            handleChange={handleSearch}
          />
          <FormRow
            type="text"
            name="sort"
            values={sort}
            options={sortOptions}
            handleChange={handleSearch}
          />

          <button
            className="btn btn-block btn-danger"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
