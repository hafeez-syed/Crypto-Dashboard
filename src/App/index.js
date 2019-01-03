import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { StyledPage, theme, GlobalStyle } from "./AppLayout";

import AppBar from "./AppBar";
import Welcome from "./Welcome";
import AppProvider from "./AppProvider";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <AppProvider>
            <AppBar />
            <Welcome />
          </AppProvider>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default App;
