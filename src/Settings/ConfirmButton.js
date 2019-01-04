import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
  color: green;
  cursor: pointer;
  margin: 20px;
`;

const ConfirmDiv = styled.div`
  display: grid;
  justify-content: center;
`;

const ConfirmButton = () => (
  <AppContext.Consumer>
    {({ confirmFavourites }) => (
      <ConfirmDiv>
        <ConfirmButtonStyled onClick={confirmFavourites}>
          Confirm Favourites
        </ConfirmButtonStyled>
      </ConfirmDiv>
    )}
  </AppContext.Consumer>
);

export default ConfirmButton;
