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

export interface ISignInCredentials {
    email: string;
    password: string;
}

export interface ISubjectConfigurationCredentials {
    id: string;
}

export interface ITestSuiteCredentials {
    subjectId: string;
    subSubjectId?: string;
    theme?: string;
    /**
     * If user select exams
     * and sessions type of exams
     * this value must contain
     * the value of selected session
     */
    session?: string;
    /**
     * If user select exams
     * and trainings type of exams
     * this value must contain
     * the value of selected training
     */
    training?: string;
}

export interface ITestSuiteImagesCredentials {
    /**
     * Test suite id.
     */
    id: string;
}

export interface IApi {
    axiosInstance: AxiosInstance;
    /** Methods related to auth */
    signup(credentials: ISignUpCredentials): Promise<AxiosResponse>;
    signin(credentials: ISignInCredentials): Promise<AxiosResponse>;
    me(): Promise<AxiosResponse>;
    logout(): Promise<AxiosResponse>;

    /** Methods related to subjects and subject configuration */
    subjects(): Promise<AxiosResponse>;
    subjectConfiguration(credentials: ISubjectConfigurationCredentials): Promise<AxiosResponse>;

    /** Methods related to test suites */
    testSuite(credentials: ITestSuiteCredentials): Promise<AxiosResponse>;
    testSuiteImages(credentials: ITestSuiteImagesCredentials): Promise<any>;
    tasksImages(credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse>;
    explanationsImages(credentials: ITestSuiteImagesCredentials): Promise<AxiosResponse>;
}
