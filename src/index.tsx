import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./components/Layout";
import dark from "./styles/themes/dark";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
