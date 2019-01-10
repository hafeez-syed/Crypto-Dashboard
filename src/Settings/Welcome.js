import React from "react";
import { AppContext } from "../App/AppProvider";

const Welcome = ({ firstVisit }) => {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to CryptoDash, please select 'and confirm' your favourite coins to begin.
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
};

export default Welcome;
