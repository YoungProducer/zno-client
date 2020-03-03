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
    ISignInCredentials,
    ISubjectConfigurationCredentials,
} from './types';

class Api implements IApi {
    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:4000',
            timeout: 10000,
        });
    }

    signup = async (credentials: ISignUpCredentials) =>
        await this.axiosInstance.post(
            '/auth/user/signup',
            { ...credentials },
            { withCredentials: true },
        )

    signin = async (credentials: ISignInCredentials) =>
        await this.axiosInstance.post(
            '/auth/user/signin',
            { ...credentials },
            { withCredentials: true },
        )

    subjectsNames = async () =>
        await this.axiosInstance.get(
            '/subjects/names',
            { withCredentials: true },
        )

    /**
     * @value (String) subject name.
     */
    subjectConfiguration = async (credentials: ISubjectConfigurationCredentials) =>
        await this.axiosInstance.get(
            `/subjects/configuration/${credentials.subjectName}`,
            { withCredentials: true },
        )
}

// Export all types related to Api
export * from './types';

// Export Api class
export default new Api();
