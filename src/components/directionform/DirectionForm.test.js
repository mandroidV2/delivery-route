import React from "react";
import { shallow } from "enzyme";
import DirectionForm from "./DirectionForm";

/** Test case is used to check the direction box component  */
describe("DirectionForm", () => {
  it("should be defined", () => {
    const component = shallow(<DirectionForm />);
    expect(component).toBeDefined();
  });

  it("should render correctly", () => {
    const component = shallow(<DirectionForm />);
    expect(component).toMatchSnapshot();
  });

  it("can clear starting location input when cross is clicked", () => {
    const component = shallow(<DirectionForm />);
    const crossBtn = component.find("img.cross_source");
    crossBtn.simulate("click");
    expect(component.state().source.length).toEqual(0);
  });

  it("can clear drop-off location input when cross is clicked", () => {
    const component = shallow(<DirectionForm />);
    const crossBtn = component.find("img.cross_destination");
    crossBtn.simulate("click");
    expect(component.state().destination.length).toEqual(0);
  });
});
