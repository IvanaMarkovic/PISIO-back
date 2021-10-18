import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/scss/style.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import BoardScreen from "./screens/BoardScreen";
import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";

//const hist = createBrowserHistory();

ReactDOM.render(
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/home">
          <HomeScreen />
        </Route>
        <Route exact path="/board">
          <BoardScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
