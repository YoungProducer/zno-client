/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Async action which make api call to subjects endpoint
 * and handles response or error.
 */

/** External imports */
import { Dispatch } from '@reduxjs/toolkit';

/** Application's imports */
import api from 'api';
import {
    subjectsLoadingAction,
    setSubjectsListAction,
} from 'store/slices/subjects';

export const fetchSubjectsNamesAction = () => async (dispatch: Dispatch<any>) => {
    dispatch(subjectsLoadingAction(true));

    return await api.subjectsNames()
        .then(response => {
            dispatch(subjectsLoadingAction(false));

            return response;
        })
        .then(response => response.data)
        .then(subjectsNames => dispatch(setSubjectsListAction(subjectsNames)))
        .catch(error => {
            dispatch(subjectsLoadingAction(false));
        });
};
