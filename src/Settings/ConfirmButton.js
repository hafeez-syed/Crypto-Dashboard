import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { fontSize1, greenBoxShadow, color3 } from "../Shared/Styles";

const ConfirmButtonStyled = styled.div`
  color: ${color3};
  cursor: pointer;
  ${fontSize1};
  margin: 20px;
  padding: 5px;
  &:hover {
    ${greenBoxShadow};
  }
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
