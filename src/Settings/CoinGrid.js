import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../App/AppProvider";
import CoinTile from "../Settings/CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

// Get first 100 coins
const getCoinsToDisplay = coinList => Object.keys(coinList).slice(0, 100);

const CoinGrid = props => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList).map(coinKey => (
            <CoinTile key={coinKey} coinKey={coinKey} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
