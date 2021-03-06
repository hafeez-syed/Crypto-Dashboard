import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { StyledPage, theme, GlobalStyle } from "./AppLayout";

import AppBar from "./AppBar";
import Settings from "../Settings";
import Dashboard from "../Dashboard";
import AppProvider from "./AppProvider";
import Content from "../Shared/Content";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <AppProvider>
            <AppBar />
            <Content>
              <Settings />
              <Dashboard />
            </Content>
          </AppProvider>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default App;
