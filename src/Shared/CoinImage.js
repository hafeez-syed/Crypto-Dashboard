import React from "react";
import styled, { css } from "styled-components";

const SpotlightImage = styled.img`
  height: 50px;
  ${props =>
    props.spotlight &&
    css`
      display: block;
      height: 200px;
      margin: auto;
    `}
`;

const CoinImage = ({ coin, spotlight }) => {
  return (
    <SpotlightImage
      spotlight={spotlight}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
      alt={coin.CoinSymbol}
    />
  );
};

export default CoinImage;
