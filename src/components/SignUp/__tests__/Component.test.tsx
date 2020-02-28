/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for SignUp Component.
 */

// External imports
import React from 'react';
import { shallow } from 'enzyme';

// Application's imports
import Component from '../Component';
import { TSignUpProps } from '../container';

describe('SignUp component', () => {
    const requiredProps: TSignUpProps = {
        errorFields: {
            email: false,
            password: false,
            confPassword: false,
        },
        fieldsMessages: {
            email: '',
            password: '',
            confPassword: '',
        },
        loading: false,
        fetchSignUp: jest.fn(),
        setSignUpErrorFieldsToDefault: jest.fn(),
        setSignUpFieldsMessagesToDefault: jest.fn(),
    };

    test('Is matches snapshot', () => {
        // Render shallow component
        const root = shallow(<Component {...requiredProps}/>);

        // Check is component matches snapshot
        expect(root).toMatchSnapshot();
    });
});
