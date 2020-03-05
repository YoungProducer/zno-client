/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Create test suites for SubjectConfigurationModal component.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';

/** Application's imports */
import Component from '../Component';
import { ETestTypes, TSubjectConfigurationModalProps } from '../container';

describe('SubjectConfigurationModal component', () => {
    /** Create mocked functions for props */
    const fetchSubjectConfiguration = jest.fn();
    const toggleSubjectConfigurationDialog = jest.fn();

    /** Define required props */
    const requiredProps: TSubjectConfigurationModalProps = {
        fetchSubjectConfiguration,
        toggleSubjectConfigurationDialog,
        dialogVisible: true,
        loading: false,
        subjectName: 'foo',
        subSubjectsNames: null,
        subSubjectsThemes: null,
        subjectExams: null,
        subjectThemes: null,
    };

    beforeEach(() => {
        (requiredProps.fetchSubjectConfiguration as jest.Mock).mockReset();
        (requiredProps.toggleSubjectConfigurationDialog as jest.Mock).mockReset();
    });

    test('Is match snapshot', () => {
        /** Render component in shallow via enzyme */
        const tree = shallow(<Component {...requiredProps} />);

        /** Assert component matches snapshot */
        expect(tree).toMatchSnapshot();
    });

    test('Select test type', () => {
        /** Render component */
        const tree = shallow(<Component {...requiredProps} />);

        /** Simulate change event */
        tree.find(`[data-testid='select-test-type']`).simulate('change', {
            target: {
                value: ETestTypes.THEMES,
            },
        });

        /** Assert testType has correct value */
        expect(tree.find(`[data-testid='select-test-type']`).props().value).toEqual(ETestTypes.THEMES);
    });

    test('Dialog onClose handler', () => {
        /** Mount component */
        const tree = mount(<Component {...requiredProps} />);

        /** Simulate click outside of dialog */
        tree.find(Backdrop).simulate('click');

        /** Assert toggleSubjectConfigurationDialog have been called with right arg  */
        expect(toggleSubjectConfigurationDialog).toHaveBeenCalledWith(false);
    });

    test(`If subSubjectsNames is not null and testType equals 'THEMES' component should render sub-subject selection text-field`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsNames={['foo']}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeTruthy();
    });

    test(`If subSubjectsNames is null select-sub-subject text field shouldn't exists`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsNames={null}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();
    });

    test(`If subSubjectsNames is not null and testType equals 'THEMES' select sub-subject`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsNames={['foo']}
            />,
        );

        /** Assert sub-subject selection text-field doesn't exist */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeFalsy();

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert sub-subject selection text-field exists */
        expect(tree.exists(`[data-testid='select-sub-subject']`)).toBeTruthy();

        /** Simulate onChange event in select-sub-subject text-field */
        tree.find(`[data-testid='select-sub-subject']`).simulate('change', { target: { value: 'foo' } });

        /** Assert select-sub-subject has value 'foo' */
        expect(tree.find(`[data-testid='select-sub-subject']`).props().value).toEqual('foo');
    });

    test(`If subjectThemes is null select-subject-theme text field shouldn't exist`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={null}
                subSubjectsNames={null}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-sub-themes selection doesn't exist */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeFalsy();
    });

    test(`If subjectThemes is not null and testType equals 'Themes' select-subject-theme text field should exists`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['bar']}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-sub-themes selection exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });

    test(`If subjectThemes is not null and testType equals 'Themes' select theme`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subjectThemes={['bar']}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`).simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();

        /** Simulate onChange event in select-subject-theme text field */
        tree.find(`[data-testid='select-subject-theme']`).simulate('change', { target: { value: 'bar' } });

        /** Assert select-subject-theme text field has correct value */
        expect(tree.find(`[data-testid='select-subject-theme']`).props().value).toBe('bar');
    });

    test(`If subSubjectThemes is not null and testType equals 'Themes' component should display theme selection`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsNames={['foo']}
                subSubjectsThemes={{ foo: ['bar'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });

    test(`If subSubjectName doesn't exist in subSubjectThemes`, () => {
        /** Render component */
        const tree = shallow(
            <Component
                {...requiredProps}
                subSubjectsNames={['foo']}
                subSubjectsThemes={{ zoo: ['bar'] }}
            />,
        );

        /** Simulate onChange event in select-test-type text field */
        tree.find(`[data-testid='select-test-type']`)
            .simulate('change', { target: { value: ETestTypes.THEMES } });

        /** Assert select-subject-theme selection text-field exists */
        expect(tree.exists(`[data-testid='select-subject-theme']`)).toBeTruthy();
    });
});
