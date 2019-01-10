import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import CoinImage from "../Shared/CoinImage";

const SpotlightImage = styled.h2`
  text-align: center;
`;

const CoinSpotlight = () => {
  return (
    <AppContext.Consumer>
      {({ coinList, currentFavourite }) => {
        const coin = coinList[currentFavourite];
        return (
          <Tile>
            <SpotlightImage>{coin.CoinName}</SpotlightImage>
            <CoinImage coin={coin} spotlight />
          </Tile>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinSpotlight;
