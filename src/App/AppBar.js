import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";
import { toProperCase } from "../utils";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`;

const Logo = styled.div`
  font-size: 1.5em;
`;

const ControlButtonElement = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      text-shadow: 0 0 60px #03ff03;
    `}

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

function ControlButton({ name }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit, page, setPage }) => (
        <ControlButtonElement
          active={page === name}
          onClick={() => setPage(name)}
          hidden={firstVisit && name === "dashboard"}
        >
          {toProperCase(name)}
        </ControlButtonElement>
      )}
    </AppContext.Consumer>
  );
}

const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton name={"dashboard"} />
      <ControlButton name={"settings"} />
    </Bar>
  );
};
export default AppBar;
