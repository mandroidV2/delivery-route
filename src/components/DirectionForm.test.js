import React from 'react';
import { shallow } from 'enzyme';
import DirectionForm from './DirectionForm';

/** Test case is used to check the map container component  */
describe('DirectionForm', () => {
    const component = shallow( <DirectionForm /> );
    it('should be defined', () => {
        expect(component).toBeDefined();
    });
    it('should render correctly', () => {
        expect(component).toMatchSnapshot();
    });
});