/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 Ferbruary 2020
 *
 * Create tests suites for async action
 * which make api call to 'signup' endpoint.
 */

// External imports
import MockAdapter from 'axios-mock-adapter';

// Application's imports
import api from 'api';
import store from 'store/__mocks__/mockedStore';
import {
    fetchSignUpAction,
    fetchSignInAction,
} from 'store/actionCreators/auth';

describe('Auth async actions', () => {
    // Create mocked axios instance
    let axiosMock = new MockAdapter(api.axiosInstance);

    describe('fetchSignUpAction', () => {
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
            }, {
                type: 'SignUp/setSignUpFieldsMessagesAction',
                payload: {
                    email: 'Неправильний шаблон',
                },
            }];

            return store.dispatch(fetchSignUpAction({
                email: 'foo',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            }) as any)
                .then(() => {
                    // Check is array of dispatched actions equals to expectedActions
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch signup with success status', () => {
            // Mock url to get success response
            axiosMock
                .onPost('/auth/user/signup')
                .reply(200, 'Success');

            // Define expected actions
            const expectedActions = [{
                type: 'SignUp/signUpLoadingAction',
                payload: true,
            }, {
                type: 'SignUp/signUpLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchSignUpAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
                confPassword: 'barbarbar',
            }) as any)
                .then(() => {
                    // Check is array of dispatched actions equals to expectedActions
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });

    describe('fetchSignInAction', () => {
        afterEach(() => {
            axiosMock.reset();
            store.clearActions();
        });

        test('Fetch sign in with invalid fields', () => {
            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setSignInErrorFieldsAction',
                payload: ['email'],
            }, {
                type: 'SignIn/setSignInFieldsMessagesAction',
                payload: {
                    email: 'Неправильний шаблон',
                },
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo',
                password: 'barbarbar',
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch sign in with succes response', () => {
            /** Mock '/auth/user/signin' url */
            axiosMock
                .onPost('/auth/user/signin')
                .reply(200, { email: 'foo@gmail.com' });

            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }, {
                type: 'SignIn/setUserDataAction',
                payload: { email: 'foo@gmail.com' },
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });

        test('Fetch sign in with error', () => {
            /** Mock '/auth/user/signin' url */
            axiosMock
                .onPost('/auth/user/signin')
                .reply(403, 'error');

            /** Define expected actions */
            const expectedActions = [{
                type: 'SignIn/signInLoadingAction',
                payload: true,
            }, {
                type: 'SignIn/signInLoadingAction',
                payload: false,
            }];

            return store.dispatch(fetchSignInAction({
                email: 'foo@gmail.com',
                password: 'barbarbar',
            }) as any)
                .then(() => {
                    /** Assert that array of dispatched actions equals to expectedActions */
                    expect(store.getActions()).toEqual(expectedActions);
                });
        });
    });
});
