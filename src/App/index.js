import React, { Component } from "react";
import Welcome from "./Welcome";
import styled, { ThemeProvider } from "styled-components";

import AppLayout, { StyledPage, theme, GlobalStyle } from "./AppLayout";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Welcome />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default App;
