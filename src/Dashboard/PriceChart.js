import React from "react";
import ReactHighcharts from "react-highcharts";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsConfig from "./HighchartsConfig";
import HighChartsTheme from "./HighchartsTheme";
import ChartSelect from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(HighChartsTheme);

const PriceChart = () => {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartInterval }) => (
        <Tile>
          <ChartSelect
            defaultValue="months"
            onChange={event => changeChartInterval(event.target.value)}
          >
            <option value="days"> Days </option>
            <option value="weeks"> Weeks </option>
            <option value="months"> Months </option>
          </ChartSelect>
          {historical ? (
            <ReactHighcharts config={HighChartsConfig(historical)} />
          ) : (
            <div>Loading Historical Data</div>
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
};

export default PriceChart;
