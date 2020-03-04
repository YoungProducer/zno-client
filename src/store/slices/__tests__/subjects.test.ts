/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test suites for subjects slice.
 */

/** Application's imports */
import subjects from 'store/slices/subjects';
import {
    subjectsLoadingAction,
    setSubjectsListAction,
    ISubjectsInitialState,
} from 'store/slices/subjects';

describe('Subjects slice', () => {
    test('subjectsLoadingAction toggle to true', () => {
        /** Define initial state */
        const initialState: ISubjectsInitialState = {
            loading: false,
            subjectsList: [],
        };

        /** Get result of dispatched action */
        const result: ISubjectsInitialState = subjects(initialState, subjectsLoadingAction(true));

        /** Assert loading equals true */
        expect(result.loading).toBeTruthy();
    });

    test('subjectsLoadingAction toggle to false', () => {
        /** Define initial state */
        const initialState: ISubjectsInitialState = {
            loading: true,
            subjectsList: [],
        };

        /** Get result of dispatched action */
        const result: ISubjectsInitialState = subjects(initialState, subjectsLoadingAction(false));

        /** Assert loading equals true */
        expect(result.loading).toBeFalsy();
    });

    test('setSubjectsListAction with param should replace existing array with array in param', () => {
        /** Define initial state */
        const initialState: ISubjectsInitialState = {
            loading: false,
            subjectsList: [],
        };

        /** Get result of dispatched action */
        const result: ISubjectsInitialState = subjects(initialState, setSubjectsListAction(
            ['Математика'],
        ));

        /** Assert subjectsList have length 1 */
        expect(result.subjectsList).toHaveLength(1);

        /** Assert subjectsList has item 'Математика' */
        expect(result.subjectsList).toEqual(['Математика']);
    });

    test('setSubjectsListAction without param should clean an subjectsList array', () => {
        /** Define initial state */
        const initialState: ISubjectsInitialState = {
            loading: false,
            subjectsList: ['Математика'],
        };

        /** Get result of dispatched action */
        const result: ISubjectsInitialState = subjects(initialState, setSubjectsListAction());

        /** Assert subjectsList array is empty */
        expect(result.subjectsList).toHaveLength(0);
    });
});
