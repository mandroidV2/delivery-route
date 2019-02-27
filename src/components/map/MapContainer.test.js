import React from "react";
import { shallow } from "enzyme";
import MapContainer from "./MapContainer";

/** Test case is used to check the map container component  */
describe("MapContainer", () => {
  const component = shallow(<MapContainer />);
  it("should be defined", () => {
    expect(component).toBeDefined();
  });
  it("should render correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
