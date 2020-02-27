/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Declare main interfaces related to API.
 */

// External imports
import { AxiosResponse, AxiosInstance } from 'axios';

export interface ISignUpCredentials {
    email: string;
    password: string;
}

export interface IApi {
    axiosInstance: AxiosInstance;
    signup(credentials: ISignUpCredentials): Promise<AxiosResponse>;
}
