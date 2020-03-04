/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Create test suites for subjectConfiguration action creators.
 */

/** External imports */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/** Application's imports */
import api from 'api';
import { fetchSubjectConfigurationAction } from '../subjectConfiguration';
import { RootState, TSubjectConfig } from 'store/slices';

describe('fetchSubjectConfigurationAction', () => {
    const MOCK_STATE = {
        subjectConfiguration: {
            loading: false,
            subjectConfig: null,
        },
    } as RootState;

    /** Create mocked axios instance */
    const mockAxios = new MockAdapter(api.axiosInstance);

    /** Define middlewares */
    const middlewares = [thunk];

    /** Create mocked store */
    const store = configureMockStore(middlewares)(MOCK_STATE);

    afterEach(() => {
        store.clearActions();
        mockAxios.reset();
    });

    test('Api call with success response', () => {
        /** Mock /subjects/configuration/{subject-name} */
        const subjectName = 'foo';
        mockAxios
            .onGet(`/subjects/configuration/${subjectName}`)
            .reply(200, {
                name: 'foo',
                themes: ['bar'],
            } as TSubjectConfig);

        /** Define expected actions */
        const expectedActions = [{
            type: 'SubjectConfiguration/subjectConfigurationLoadingAction',
            payload: true,
        }, {
            type: 'SubjectConfiguration/subjectConfigurationLoadingAction',
            payload: false,
        }, {
            type: 'SubjectConfiguration/setSubjectConfigAction',
            payload: {
                name: 'foo',
                themes: ['bar'],
            },
        }];

        /** Dispatch action */
        return store.dispatch(fetchSubjectConfigurationAction({
            subjectName,
        }) as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    test('Api call with error', () => {
        /** Mock /subjects/configuration/{subject-name} */
        const subjectName = 'foo';
        mockAxios
            .onGet(`/subjects/configuration/${subjectName}`)
            .reply(404);

        /** Define expected actions */
        const expectedActions = [{
            type: 'SubjectConfiguration/subjectConfigurationLoadingAction',
            payload: true,
        }, {
            type: 'SubjectConfiguration/subjectConfigurationLoadingAction',
            payload: false,
        }];

        /** Dispatch action */
        return store.dispatch(fetchSubjectConfigurationAction({
            subjectName,
        }) as any)
            .then(() => {
                /** Assert list of dispatched actions equals to expected actions */
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
