import styled, { createGlobalStyle } from "styled-components";

export default styled.div`
  padding: 40px;
`;

export const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  darkBlue: "#010e2c",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  white: "#FFFFFF",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

export const StyledPage = styled.div`
  color: ${props => props.theme.white};
`;

export const GlobalStyle = createGlobalStyle`
    body {
      background: ${props => props.theme.darkBlue};
      color: ${props => props.theme.white};
      font-family: 'Do Hyeon', sans-serif;
      margin: 0 auto;
      padding: 40px;
    }
  `;
