/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create tests suites for routes component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TRoutesProps } from '../container';

describe('Routes component', () => {
    /** Define required props */
    const requiredProps: TRoutesProps = {
        isLoggedIn: false,
    };

    test('Is match snapshot', () => {
        /** Render component in shallow */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });
});
