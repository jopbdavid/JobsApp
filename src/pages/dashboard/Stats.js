import React, { useEffect } from "react";
import { StatsContainer, ChartsContainer, Loading } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { showStats } from "../../features/job/allJobsSlicer";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
    //enlist-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications?.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
