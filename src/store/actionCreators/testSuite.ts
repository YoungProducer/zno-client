/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Async action creator which makes api call
 * to api/test-suite endpoint.
 */

/** External imports */
import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api, { ITestSuiteCredentials } from 'api';
import { testSuiteLoadingAction, setRightAnswersAction, setTasksImagesAction, setExplanationsImagesAction } from 'store/slices';

export const fetchTestSuiteAction = (credentials: ITestSuiteCredentials) =>
    async (dispatch: Dispatch<any>) => {
        dispatch(testSuiteLoadingAction(true));

        return await api.testSuite(credentials)
            .then(response => response.data)
            .then(testSuiteData => {
                dispatch(setRightAnswersAction(testSuiteData.answers));

                return api.testSuiteImages({ id: testSuiteData.id })
                    .then(axios.spread((tasks, explanations) => {
                        dispatch(testSuiteLoadingAction(false));

                        return [tasks.data, explanations.data];
                    }))
                    .then(([tasks, explanations]) => {
                        dispatch(setTasksImagesAction(tasks));
                        dispatch(setExplanationsImagesAction(explanations));
                    })
                    .catch(error => {
                        throw error;
                    });
            })
            .catch(error => {
                dispatch(testSuiteLoadingAction(false));
            });
    };
