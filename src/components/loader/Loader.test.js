import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

/** Test case is used to check the loader component  */
describe('Loader', () => {
    const component = shallow( <Loader /> );
    it('should be defined', () => {
        expect(component).toBeDefined();
    });
    it('should render correctly', () => {
        expect(component).toMatchSnapshot();
    });
});