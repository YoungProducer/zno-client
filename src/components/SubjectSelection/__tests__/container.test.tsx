/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create tests suites for SubjectSelection container.
 * @jest-environment jsdom
 */

/** External imports */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

/** Application's imports */
import container, { TSubjectSelectionProps } from '../container';
import { fetchSubjectsNamesAction } from 'store/actionCreators/subjects';
import {
    selectSubjectsLoading,
    selectSubjectsList,
} from 'store/selectors/subjects';
import { RootState } from 'store/slices';

/** Mock modules */
jest.mock('store/actionCreators/subjects');
jest.mock('store/selectors/subjects');

describe('SubjectSelection container', () => {
    const MOCK_STATE = {
        subjects: {
            loading: false,
            subjectsList: [],
        },
    } as RootState;

    /** Define middlewares */
    const middlewares = [thunk];

    /** Create mocked store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
    });

    test('applies classes to component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        (selectSubjectsLoading as jest.Mock)
            .mockReturnValue(false);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { classes } =
            componentWrapper.find('TestComponent').props() as TSubjectSelectionProps;

        /** Assert the correct keys have been added to the component */
        expect(classes).toHaveProperty('root');
    });

    test('Sets fetchSubjectsNames prop on component', () => {
        /** Stub action creator mock */
        const MOCK_ACTION = {
            type: 'foo123',
        };
        (fetchSubjectsNamesAction as jest.Mock)
            .mockReturnValue(MOCK_ACTION);

        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract fetchSubjectsNames prop */
        const { fetchSubjectsNames } =
            componentWrapper.find('TestComponent').props() as TSubjectSelectionProps;

        /** Invoke fetchSubjectsNames */
        fetchSubjectsNames();

        /** Assert the correct keys have been added to the component */
        expect(store.getActions()).toEqual([MOCK_ACTION]);
    });

    test('Sets loading prop on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create stub for selector */
        (selectSubjectsLoading as jest.Mock)
            .mockReturnValue(false);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract loading prop */
        const { loading } =
            componentWrapper.find('TestComponent').props() as TSubjectSelectionProps;

        /** Assert the correct keys have been added to the component */
        expect(loading).toBeFalsy();
    });

    test('Sets subjectsList prop on component', () => {
        /** Create a stub component to wrap */
        const TestComponent = () => <div />;

        /** Configure component via HOC */
        const ConfiguredComponent = container(TestComponent);

        /** Create a stub for selector */
        (selectSubjectsList as jest.Mock)
            .mockReturnValue(['foo']);

        /** Mount via enzyme */
        const componentWrapper = mount(
            <Provider store={store}>
                <ConfiguredComponent />
            </Provider>,
        );

        /** Extract subjectsList prop */
        const { subjectsList } =
            componentWrapper.find('TestComponent').props() as TSubjectSelectionProps;

        /** Assert the correct keys have been added to the component */
        expect(subjectsList).toEqual(['foo']);
    });
});
