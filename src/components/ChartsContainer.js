import React, { useState } from "react";
import BarChartComp from "./BarChartComp";
import AreaChartComp from "./AreaChartComp";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = () => {
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Charts Container</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
