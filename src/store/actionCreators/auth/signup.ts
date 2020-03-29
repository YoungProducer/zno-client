/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create async action which make api call to signup endpoint and dispatch some actions.
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';
import { History } from 'history';
// import pick from 'lodash/pick';

// Application's imports
import api from 'api';
import {
    signUpLoadingAction,
    setSignUpErrorFieldsAction,
    setSignUpFieldsMessagesAction,
} from 'store/slices/auth';
import {
    verifySignUpCredentials,
    IFetchSignUpActionCredentials,
} from 'utils/verify-credentials';
import { RootState } from 'store/slices';

export const fetchSignUpAction = (credentials: IFetchSignUpActionCredentials) =>
    async (dispatch: Dispatch<any>, _: () => RootState, history: History) => {
        dispatch(signUpLoadingAction(true));

        const invalidData = verifySignUpCredentials(credentials);

        if (!invalidData) {
            return await api.signup({
                email: credentials.email,
                password: credentials.password,
            })
                .then(response => {
                    dispatch(signUpLoadingAction(false));

                    history.push(`/auth/signin?email=${credentials.email}`);
                    return response;
                })
                .catch(error => {
                    // const errorData = error.response.data.error.data;

                    // if (Object.keys(error.response.data).some(key => key === 'error')) {
                    //     dispatch(setSignUpErrorFieldsAction(errorData.invalidFields));
                    //     dispatch(setSignUpFieldsMessagesAction(errorData.invalidFieldsMessages));
                    // }
                    dispatch(signUpLoadingAction(false));
                });
        }

        dispatch(signUpLoadingAction(false));
        dispatch(setSignUpErrorFieldsAction(invalidData.invalidFields));
        dispatch(setSignUpFieldsMessagesAction(invalidData.fieldsMessages));
    };
