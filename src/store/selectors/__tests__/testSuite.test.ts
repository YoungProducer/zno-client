/**
 * Created by: Oleksandr Bezrukov
 * Creation date 21 March 2020
 *
 * Test suite for 'testSuite' selectors.
 */

/** Application's imports */
import { RootState } from "store/slices";
import {
    selectTestSuiteLoading,
    selectTestSuiteName,
    selectTestSuiteTasksImages,
    selectTestSuiteExplanationsImages,
    selectAnswers,
    selectAnswerByTaskIndex,
    selectIsAnswerSelected,
    selectIsAnswerGived,
    selectIsAnswerRight,
    selectAmountOfSelectedAnswers,
    selectAmountOfGivedAnswers,
    selectAmountOfRightAnswers,
} from "../testSuite";

describe('TestSuite selectors', () => {
    test('selectTestSuiteLoading', () => {
        /** Define state */
        const state = {
            testSuite: {
                loading: false,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuiteLoading(state);

        /** Assert result of selector has right value */
        expect(result).toBeFalsy();
    });

    test('selectTestSuiteName', () => {
        /** Define state */
        const state = {
            testSuite: {
                name: 'foo',
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuiteName(state);

        /** Assert result of selector has right value */
        expect(result).toBe('foo');
    });

    test('selectTestSuiteTasksImages', () => {
        /** Define mocked state */
        const state  = {
            testSuite: {
                tasksImages: ['foo'],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuiteTasksImages(state);

        /** Assert result of selector has right keys */
        expect(result).toEqual(['foo']);
    });

    test('selectTestSuiteExplanationsImages', () => {
        /** Define mocked state */
        const state  = {
            testSuite: {
                explanationImages: ['foo'],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuiteExplanationsImages(state);

        /** Assert result of selector has right keys */
        expect(result).toEqual(['foo']);
    });

    test('selectAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['0'],
                    gived: ['0'],
                    right: ['1'],
                    type: 'SINGLE',
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectAnswers(state);

        /** Assert result has right values */
        expect(result).toEqual([{
            selected: ['0'],
            gived: ['0'],
            right: ['1'],
            type: 'SINGLE',
        }]);
    });

    test('selectAnswerByTaskIndex', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['0'],
                    gived: ['0'],
                    right: ['1'],
                    type: 'SINGLE',
                }, {
                    selected: ['1'],
                    gived: ['1'],
                    right: ['2'],
                    type: 'SINGLE',
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectAnswerByTaskIndex(state, { taskIndex: 1 });

        /** Assert result has right values */
        expect(result).toEqual({
            selected: ['1'],
            gived: ['1'],
            right: ['2'],
            type: 'SINGLE',
        });
    });

    test('selectIsAnswerSelected with already selected answers should return true', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['2', '1'],
                }, {
                    selected: ['3', '4'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerSelected(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeTruthy();
    });

    test('selectIsAnswerSelected without selected answers should return false', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['2', '1'],
                }, {
                    selected: ['', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerSelected(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });

    test('selectIsAnswerSelected when only one answer is selected should return true', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['2', '1'],
                }, {
                    selected: ['3', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerSelected(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeTruthy();
    });

    test('selectIsAnswerGived when only one answer is selected should return false', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                }, {
                    gived: ['3', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerGived(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });

    test('selectIsAnswerGived if all answers are not selected should return false', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                }, {
                    gived: ['', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerGived(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });

    test('selectIsAnswerGived if all answers are selected should return true', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                }, {
                    gived: ['2', '1'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerGived(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeTruthy();
    });

    test('selectIsAnswerRight if all answers are right should return true', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                    right: ['2', '1'],
                }, {
                    gived: ['2', '1'],
                    right: ['3', '4'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerRight(state, { taskIndex: 0 });

        /** Assert selector returns right value */
        expect(result).toBeTruthy();
    });

    test('selectIsAnswerRight if one answer are incorrect should return false', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                    right: ['2', '1'],
                }, {
                    gived: ['2', '1'],
                    right: ['2', '4'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerRight(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });

    test(`selectIsAnswerRight if gived and right answers have different dividers: '.', ','`, () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['3.7'],
                    right: ['3,7'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerRight(state, { taskIndex: 0 });

        /** Assert result has correct value */
        expect(result).toBeTruthy();
    });

    test('selectAmountOfSelectedAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    selected: ['2', '1'],
                }, {
                    selected: ['3', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectAmountOfSelectedAnswers(state);

        /** Assert result has right value */
        expect(result).toBe(2);
    });

    test('selectAmountOfGivedAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                }, {
                    gived: ['3', ''],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectAmountOfGivedAnswers(state);

        /** Assert result has right value */
        expect(result).toBe(1);
    });

    test('selectAmountOfRightAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                answers: [{
                    gived: ['2', '1'],
                    right: ['2', '1'],
                }, {
                    gived: ['3', ''],
                    right: ['3', '0'],
                }],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectAmountOfRightAnswers(state);

        /** Assert result has right value */
        expect(result).toBe(1);
    });
});
