/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create test suites for auth reducer.
 */

// Application's imports
import signUp from 'store/slices/auth/signup';
import {
    signUpLoadingAction,
    setSignUpErrorFieldsAction,
    setSignUpErrorFieldsToDefaultAction,
    setSignUpFieldsMessagesAction,
    setSignUpFieldsMessagesToDefaultAction,
    ISignUpInitialState,
} from 'store/slices/auth';

describe('Auth reducer', () => {
    describe('SignUp reducer', () => {
        test('signUpLoadingAction toggle to true', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: true,
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, signUpLoadingAction(true));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('signUpLoadingAction toggle to false', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: true,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, signUpLoadingAction(false));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpErrorFieldsAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                    confPassword: true,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                    confPassword: '',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpErrorFieldsAction(['email', 'confPassword']));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpErrorFieldsAction with non-existing property', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: true,
                    password: false,
                    confPassword: true,
                },
                fieldsMessages: {
                    email: '',
                    password: '',
                    confPassword: '',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpErrorFieldsAction(['email', 'confPassword', 'foo']));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpErrorFieldsToDefaultAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
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
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpErrorFieldsToDefaultAction());

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpFieldsMessagesAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
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
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: '',
                    confPassword: '',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpFieldsMessagesAction({
                email: 'foo',
            }));

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });

        test('setSignUpFieldsMessagesToDefaultAction', () => {
            // Define initial state
            const initialState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: 'foo',
                    password: 'bar',
                    confPassword: '',
                },
            };

            // Define expected state
            const expectedState: ISignUpInitialState = {
                loading: false,
                errorFields: {
                    email: false,
                    password: false,
                    confPassword: false,
                },
                fieldsMessages: {
                    email: '',
                    password: 'Не менше 8 символів.',
                    confPassword: 'Підвердіть ваш пароль.',
                },
            };

            // Get result of dispatched action
            const result = signUp(initialState, setSignUpFieldsMessagesToDefaultAction());

            // Check is result equals to expected state
            expect(result).toEqual(expectedState);
        });
    });
});
