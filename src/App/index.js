import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import AppLayout, { StyledPage, theme, GlobalStyle } from "./AppLayout";

import AppBar from "./AppBar";
import Welcome from "./Welcome";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <AppBar />
          <Welcome />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default App;
