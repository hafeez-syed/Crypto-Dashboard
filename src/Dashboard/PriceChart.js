import React from "react";
import ReactHighcharts from "react-highcharts";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsConfig from "./HighchartsConfig";
import HighChartsTheme from "./HighchartsTheme";

ReactHighcharts.Highcharts.setOptions(HighChartsTheme);

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          <ReactHighcharts config={HighChartsConfig(historical)} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
};

export default PriceChart;
