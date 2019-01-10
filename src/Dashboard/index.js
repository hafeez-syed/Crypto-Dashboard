import React from "react";
import styled from "styled-components";

import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";

const ChartGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
  margin-top: 20px;
`;

const Dashboard = () => {
  return (
    <Page name="dashboard">
      <PriceGrid />
      <ChartGrid>
        <CoinSpotlight />
        <div>Chart goes here</div>
      </ChartGrid>
    </Page>
  );
};

export default Dashboard;
