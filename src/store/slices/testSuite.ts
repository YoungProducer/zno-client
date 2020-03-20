/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Slice which handle different types of answers and test suites.
 * In future should display online progress(how many answers are gived right
 * and how many answers have been gived).
 */

/** External imports */
import { createSlice } from '@reduxjs/toolkit';

/** Application's imports */
import { ILoadingAction } from 'store/types';

/** Declare interface for actions and payloads */
interface IShowRightDuringTestAction {
    payload: boolean;
}

interface ILimitTestSuiteTimeAction {
    payload: boolean;
}

/** This interface for tasks and explanations images */
interface ISetTestSuiteImagesAction {
    payload: string[];
}

interface ISetRightAnswersAction {
    payload: (string[])[];
}

interface IInitTestSuiteAnswersAction {
    payload: (string[])[];
}

/** Declare interface for initial state */
export interface ITestSuiteInitialState {
    /**
     * This variable should display when images and right answers
     * are downloaded.
     */
    loading: boolean;
    /**
     * Condition of tasks.
     */
    tasksImages: string[];
    /**
     * Explanation for tasks.
     */
    explanationImages: string[];
    /**
     * Right answers.
     */
    rightAnswers: (string[])[];
    /**
     * Selected answers.
     * Just selected not gived
     * it means that user can change anywhen.
     */
    selectedAnswers: (string[])[];
    /**
     * Gived answers.
     * If answers passed to this array
     * app will show user is his answer is right.
     */
    givedAnswers: (string[])[];
    /**
     * Displays is answer right during the test
     * or after its completion.
     */
    showRightDuringTest: boolean;
    /**
     * Limit time for test.
     * Avalaible only for sessions (exams).
     * By default: 180 minutes(3 hours).
     */
    limitTime: boolean;
}

/** Create initial state */
const initialState: ITestSuiteInitialState = {
    loading: false,
    showRightDuringTest: false,
    limitTime: false,
    tasksImages: [],
    explanationImages: [],
    rightAnswers: [],
    selectedAnswers: [],
    givedAnswers: [],
};

/** Create slice */
const testSuite = createSlice({
    initialState,
    name: 'TestSuite',
    reducers: {
        /**
         * Toggles loading property.
         */
        testSuiteLoadingAction: (
            state: ITestSuiteInitialState,
            { payload }: ILoadingAction,
        ) => ({
            ...state,
            loading: payload,
        }),
        /**
         * Toggles value related to display right answers
         * during the test or after completion.
         */
        showRightDuringTestAction: (
            state: ITestSuiteInitialState,
            { payload }: IShowRightDuringTestAction,
        ) => ({
            ...state,
            showRightDuringTest: payload,
        }),
        /**
         * Toggles value related to time limit for test.
         */
        limitTestSuiteTimeAction: (
            state: ITestSuiteInitialState,
            { payload }: ILimitTestSuiteTimeAction,
        ) => ({
            ...state,
            limitTime: payload,
        }),
        /**
         * Set tasks images.
         * If payload is undefined it will set tasks images
         * to default(empty array).
         */
        setTasksImagesAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetTestSuiteImagesAction,
            ) => ({
                ...state,
                tasksImages: payload,
            }),
            prepare: (images?: string[]) => ({
                payload: images ? images : [],
            }),
        },
        /**
         * Set explanations images.
         * If payload is undefined it will set explanations images
         * to default(empty array).
         */
        setExplanationsImagesAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetTestSuiteImagesAction,
            ) => ({
                ...state,
                explanationImages: payload,
            }),
            prepare: (images?: string[]) => ({
                payload: images ? images : [],
            }),
        },
        /**
         * Set right answers array.
         * If payload is undefined it will set right answers
         * to default(empty array).
         */
        setRightAnswersAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: ISetRightAnswersAction,
            ) => ({
                ...state,
                rightAnswers: payload,
            }),
            prepare: (answers?: (string[])[]) => ({
                payload: answers ? answers : [],
            }),
        },
        /**
         * Set user answers array.
         * If payload exists
         * returns same array but with replaced values to ''.
         * If payload doesn't exist
         * returns empty array.
         */
        setAnswersAction: {
            reducer: (
                state: ITestSuiteInitialState,
                { payload }: IInitTestSuiteAnswersAction,
            ) => ({
                ...state,
                selectedAnswers: payload,
                givedAnswers: payload,
            }),
            prepare: (answers?: (string[])[]) => ({
                payload: answers ? answers.map(answer => answer.map((() => ''))) : [],
            }),
        },
    },
});

/** Export actions */
export const {
    testSuiteLoadingAction,
    showRightDuringTestAction,
    limitTestSuiteTimeAction,
    setTasksImagesAction,
    setExplanationsImagesAction,
    setRightAnswersAction,
    setAnswersAction,
} = testSuite.actions;

/** Export reducer */
export default testSuite.reducer;
