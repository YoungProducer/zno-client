/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for SignUp Component.
 * @jest-environment jsdom
 */

// External imports
import React from 'react';
import { shallow, mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';

// Application's imports
import api from 'api';
import Component from '../Component';
import { TSignUpProps } from '../container';

describe('SignUp component', () => {
    // Mock props functions
    const fetchSignUp = jest.fn();
    const setSignUpErrorFieldsToDefault = jest.fn();
    const setSignUpFieldsMessagesToDefault = jest.fn();

    const requiredProps: TSignUpProps = {
        fetchSignUp,
        setSignUpErrorFieldsToDefault,
        setSignUpFieldsMessagesToDefault,
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
    };

    const container = mount(<Component {...requiredProps}/>);

    test('Is matches snapshot', () => {
        // Render shallow component
        const root = shallow(<Component {...requiredProps}/>);

        // Check is component matches snapshot
        expect(root).toMatchSnapshot();
    });

    test(`Is makes api call to signup endpoint when press button 'Реєстрація'`, () => {
        /** Mount component */
        const wrapper = shallow(<Component {...requiredProps}/>);

        /** Select signup button */
        const signUpButton = wrapper.find(`[data-testid='signup-button']`);

        /** Simulate click for signup button */
        signUpButton.simulate('click');

        /** Assert that fetchSignUp have been called */
        expect(fetchSignUp).toHaveBeenCalled();
    });
});
