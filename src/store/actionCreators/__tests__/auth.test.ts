/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 Ferbruary 2020
 *
 * Create tests suites for async action
 * which make api call to 'signup' endpoint.
 */

// External imports
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Application's imports
import Api, { api } from 'api';
import store from 'store/__mocks__/mockedStore';
import {
    fetchSignUpAction,
    IFetchSignUpActionCredentials,
} from 'store/actionCreators/auth/signup';
import { RootState } from 'store/slices';

describe('SignUp', () => {
    // Create new instance of the Api class
    // const api = new Api();

    // Create mocked axios instance
    const axiosMock = new MockAdapter(api.axiosInstance);

    afterEach(() => {
        axiosMock.reset();
        store.clearActions();
    });

    test('Fetch signup with invalid fields', () => {
        // Define expected actions
        const expectedActions = [{
            type: 'SignUp/signUpLoadingAction',
            payload: true,
        }, {
            type: 'SignUp/signUpLoadingAction',
            payload: false,
        }, {
            type: 'SignUp/setSignUpErrorFieldsAction',
            payload: ['email'],
        }];

        return store.dispatch(fetchSignUpAction({
            email: 'foo',
            password: 'barbarbar',
            confPassword: 'barbarbar',
        }) as any)
            .then(() => {
                // Chech is array of dispatched actions equals to expectedActions
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
