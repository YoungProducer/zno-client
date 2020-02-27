/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create async action which make api call to signup endpoint and dispatch some actions.
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';
import _ from 'lodash';

// Application's imports
import Api from 'api';
import {
    signUpLoadingAction,
    setSignUpErrorFieldsAction,
    setSignUpFieldsMessagesAction,
} from 'store/slices/auth';
import { verifySignUpCredentials } from 'utils/verify-credentials';

export interface IFetchSignUpActionCredentials {
    email: string;
    password: string;
    confPassword: string;
}

export const fetchSignUpAction = (credentials: IFetchSignUpActionCredentials) => async (dispatch: Dispatch<any>) => {
    dispatch(signUpLoadingAction(true));

    const invalidData = verifySignUpCredentials(credentials);

    if (!invalidData) {
        const api = new Api();

        return await api.signup(_.pick(credentials, ['email', 'password']))
            .then(response => {
                if (response.status !== 200) {
                    dispatch(signUpLoadingAction(false));

                    throw Error(response.statusText);
                }

                return response;
            })
            .then(response => {
                dispatch(signUpLoadingAction(false));
            })
            .catch(error => console.error(error));
    }

    dispatch(signUpLoadingAction(false));
    dispatch(setSignUpErrorFieldsAction(invalidData.invalidFields));
};
