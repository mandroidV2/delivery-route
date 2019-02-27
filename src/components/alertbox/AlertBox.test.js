import React from "react";
import { shallow } from "enzyme";
import AlertBox from "./AlertBox";

/** Test case is used to check the alert box component  */
describe("AlertBox", () => {
  const component = shallow(<AlertBox />);
  it("should be defined", () => {
    expect(component).toBeDefined();
  });
  it("should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
