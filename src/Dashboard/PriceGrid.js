import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGridStyled>
          {prices.map((price, index) => (
            <PriceTile key={`price-tile${index}`} price={price} index={index}>
              {Object.keys(price)[0]}
            </PriceTile>
          ))}
        </PriceGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default PriceGrid;
