/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create tests suites for PrivateRoute component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { shallow, mount } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TPrivateRoute } from '../container';

describe('PrivateRoute component', () => {
    /** Define required props */
    const requiredProps: TPrivateRoute = {
        isLoggedIn: false,
        children: <div />,
        path: '/',
        exact: true,
    };

    test('Is match snapshot', () => {
        /** Render component in shallow */
        const root = shallow(<Component {...requiredProps}/>);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });
});
