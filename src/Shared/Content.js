import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = props => {
  return (
    <AppContext.Consumer>
      {({ coinList, prices, firstVisit }) => {
        if (!coinList) {
          return <p>Loading Coins</p>;
        }
        if (!firstVisit && !prices) {
          return <p>Loading Prices</p>;
        }
        return <div>{props.children}</div>;
      }}
    </AppContext.Consumer>
  );
};

export default Content;
