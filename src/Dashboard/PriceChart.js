import React from "react";
import ReactHighcharts from "react-highcharts";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsConfig from "./HighChartsConfig";

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({}) => (
        <Tile>
          <ReactHighcharts config={HighChartsConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
};

export default PriceChart;
