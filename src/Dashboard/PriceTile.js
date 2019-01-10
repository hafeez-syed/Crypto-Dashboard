import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import { currency } from "../utils";

import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { restrictDecimal } from "../utils";

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(4, 1fr);
      justify-items: right;
    `}

  ${props =>
    props.currentFavourite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePercentage = styled.div`
  color: green;
  &:after {
    content: " %";
  }
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`;

const CurrencyPrice = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 35px 1fr;
  margin-top: 10px;
`;

const PercentageChange = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePercentage red={data.CHANGEPCT24HOUR < 0}>
        {restrictDecimal(data.CHANGEPCT24HOUR)}
      </ChangePercentage>
    </JustifyRight>
  );
};

const Tile = ({ symbol, data, currentFavourite, setCurrentFavourite }) => {
  return (
    <PriceTileStyled
      currentFavourite={currentFavourite}
      onClick={setCurrentFavourite}
    >
      <CoinHeaderGridStyled>
        <div>{symbol}</div>
        <PercentageChange data={data} />
      </CoinHeaderGridStyled>
      <CurrencyPrice>
        <TickerPrice>${restrictDecimal(data.PRICE)}</TickerPrice>
      </CurrencyPrice>
    </PriceTileStyled>
  );
};

const TileCompact = ({
  symbol,
  data,
  currentFavourite,
  setCurrentFavourite
}) => {
  return (
    <PriceTileStyled
      compact
      currentFavourite={currentFavourite}
      onClick={setCurrentFavourite}
    >
      <JustifyLeft>{symbol}</JustifyLeft>
      <PercentageChange data={data} />
      <TickerPrice>${restrictDecimal(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  let symbol = Object.keys(price)[0];
  let data = price[symbol][currency];
  let TileType = index < 5 ? Tile : TileCompact;
  return (
    <AppContext.Consumer>
      {({ currentFavourite, setCurrentFavourite }) => (
        <TileType
          symbol={symbol}
          data={data}
          currentFavourite={currentFavourite === symbol}
          setCurrentFavourite={() => setCurrentFavourite(symbol)}
        />
      )}
    </AppContext.Consumer>
  );
};

export default PriceTile;
