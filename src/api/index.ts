/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 February 2020
 *
 * Create Api class which have methods which make API calls to backend endpoints.
 */

// External imports
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Application's imports
import {
    IApi,
    ISignUpCredentials,
} from './types';

class Api implements IApi {
    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 10000,
        });
    }

    signup = async (credentials: ISignUpCredentials): Promise<AxiosResponse> =>
        await this.axiosInstance.post(
            '/auth/user/signup',
            { ...credentials },
        )
}

// Export all types related to Api
export * from './types';

// Export Api class
export default Api;
