import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { lightTheme } from "./theme";
import reset from "styled-reset";
import "./fonts/fonts.css";

const GlobalStyled = createGlobalStyle`
  ${reset}
  body{
    font-size:16px;
    font-family: "Sebang";
    box-sizing: border-box;
    color:rgba(99, 110, 114,1.0);
  }
  a{
    color:rgba(99, 110, 114,1.0);
    text-decoration: none;
  }
  h1{
        font-family:"SebangBold";
    }
`;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <GlobalStyled />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
