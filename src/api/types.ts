/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Declare main interfaces related to API.
 */

// External imports
import { AxiosResponse } from 'axios';

export interface IApi {
    signup(credentials: ISignUpCredentials): Promise<AxiosResponse>;
}

export interface ISignUpCredentials {
    email: string;
    password: string;
}
