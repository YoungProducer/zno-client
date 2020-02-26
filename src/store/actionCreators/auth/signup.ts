/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create async action which make api call to signup endpoint and dispatch some actions.
 */

// External imports
import { Dispatch } from '@reduxjs/toolkit';

// Application's imports
import Api from 'api';
import { signUpLoadingAction } from 'store/slices/auth';
import { verifySignUpCredentials } from 'utils/verify-credentials';

export interface IFetchSignUpActionCredentials {
    email: string;
    password: string;
    confPassword: string;
}

export const fetchSignUpAction = (credentials: IFetchSignUpActionCredentials) => (dispatch: Dispatch<any>) => {
    dispatch(signUpLoadingAction(true));

    const invalidData = verifySignUpCredentials(credentials);
};
