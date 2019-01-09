import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { restrictDecimal } from "../utils";

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}
`;

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const ChangePercentage = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
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

const Tile = ({ symbol, data }) => {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div>{symbol}</div>
        <PercentageChange data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${restrictDecimal(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const TileCompact = ({ symbol, data }) => {
  return (
    <PriceTileStyled compact>
      <JustifyLeft>{symbol}</JustifyLeft>
      <PercentageChange data={data} />
      <TickerPrice>${restrictDecimal(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  let symbol = Object.keys(price)[0];
  let data = price[symbol]["AUD"];
  let TileType = index < 5 ? Tile : TileCompact;
  return <TileType symbol={symbol} data={data} />;
};

export default PriceTile;
