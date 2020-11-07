import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "../components/HeaderContainer";

import store from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

beforeEach(cleanup);

describe("<Header />", () => {
  it("renders the header component", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(queryByTestId("header")).toBeTruthy();
  });
});
