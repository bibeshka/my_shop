import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "../components/HeaderContainer";

beforeEach(cleanup);

describe("<Header />", () => {
  it("renders the header component", () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId("header")).toBeTruthy();
  });
});
