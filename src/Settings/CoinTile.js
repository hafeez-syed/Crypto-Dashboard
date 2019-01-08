import React from "react";
import { AppContext } from "../App/AppProvider";
import { DeletableTile, DisableTile, SelectableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

const clickHandler = (topSection, coinKey, addCoin, removeCoin) => {
  return topSection ? removeCoin(coinKey) : addCoin(coinKey);
};

const CoinTile = ({ coinKey, topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, addCoin, removeCoin, isCoinInFavourites }) => {
        let coin = coinList[coinKey];
        const TileClass = topSection
          ? DeletableTile
          : isCoinInFavourites(coinKey)
          ? DisableTile
          : SelectableTile;
        return (
          <TileClass
            onClick={() =>
              clickHandler(topSection, coinKey, addCoin, removeCoin)
            }
          >
            <CoinHeaderGrid
              name={coin.CoinName}
              symbol={coin.Symbol}
              topSection={topSection}
            />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};

export default CoinTile;
