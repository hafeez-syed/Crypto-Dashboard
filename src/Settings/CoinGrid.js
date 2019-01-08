import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import CoinTile from "../Settings/CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

// Get first 100 coins
const getCoinsToDisplay = (coinList, topSection, favourites) =>
  topSection ? favourites : Object.keys(coinList).slice(0, 100);

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favourites }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection, favourites).map(coinKey => (
            <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
