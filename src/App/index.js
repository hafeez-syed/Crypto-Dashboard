import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { StyledPage, theme, GlobalStyle } from "./AppLayout";

import AppBar from "./AppBar";
import Settings from "../Settings";
import AppProvider from "./AppProvider";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <AppProvider>
            <AppBar />
            <Settings />
          </AppProvider>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default App;
