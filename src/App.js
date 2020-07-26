import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import NavBar from "./NavBar";
import { Provider } from "react-redux";
import store from "./store";


const App = () => {
  return (
    <Provider store={store}>
      <StrictMode>
        <div>
          <NavBar />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </StrictMode>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
