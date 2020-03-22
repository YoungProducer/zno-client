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
    selectTestSuiteLimitTime,
    selectShowRightDuringTest,
    selectTestSuitesTasksImages,
    selectTestSuiteExplanationsImages,
    selectSelectedAnswers,
    selectGivedAnswers,
    selectRightAnswers,
    selectSelectedAnswerByTaskIndex,
    selectGivedAnswerByTaskIndex,
    selectIsAnswerSelected,
    selectIsAnswerGived,
    selectIsAnswerRight,
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

    test('selectTestSuiteLimitTime', () => {
        /** Define state */
        const state = {
            testSuite: {
                limitTime: false,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuiteLimitTime(state);

        /** Assert result of selector has right value */
        expect(result).toBeFalsy();
    });

    test('selectShowRightDuringTest', () => {
        /** Define mocked state */
        const state  = {
            testSuite: {
                showRightDuringTest: false,
            },
        } as RootState;

        /** Get selector's result */
        const result = selectShowRightDuringTest(state);

        /** Assert result of selector has right value */
        expect(result).toBeFalsy();
    });

    test('selectTestSuiteTasksImages', () => {
        /** Define mocked state */
        const state  = {
            testSuite: {
                tasksImages: ['foo'],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectTestSuitesTasksImages(state);

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

    test('selectSelectedAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                selectedAnswers: [['0']],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSelectedAnswers(state);

        /** Assert result of selector has right keys */
        expect(result).toEqual([['0']]);
    });

    test('selectGivedAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                givedAnswers: [['2', '1']],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectGivedAnswers(state);

        /** Assert result of selector has right keys */
        expect(result).toEqual([['2', '1']]);
    });

    test('selectRightAnswers', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                rightAnswers: [['2', '1']],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectRightAnswers(state);

        /** Assert result of selector has right keys */
        expect(result).toEqual([['2', '1']]);
    });

    test('selectSelectedAnswerByTaskIndex', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                selectedAnswers: [
                    ['2', '1'],
                    ['3', '4'],
                ],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectSelectedAnswerByTaskIndex(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toEqual(['3', '4']);
    });

    test('selectGivedAnswerByTaskIndex', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                givedAnswers: [
                    ['2', '1'],
                    ['3', '4'],
                ],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectGivedAnswerByTaskIndex(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toEqual(['3', '4']);
    });

    test('selectIsAnswerSelected with already selected answers should return true', () => {
        /** Define mocked state */
        const state = {
            testSuite: {
                selectedAnswers: [
                    ['2', '1'],
                    ['3', '4'],
                ],
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
                selectedAnswers: [
                    ['2', '1'],
                    ['', ''],
                ],
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
                selectedAnswers: [
                    ['2', '1'],
                    ['3', ''],
                ],
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
                givedAnswers: [
                    ['2', '1'],
                    ['3', ''],
                ],
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
                givedAnswers: [
                    ['2', '1'],
                    ['', ''],
                ],
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
                givedAnswers: [
                    ['2', '1'],
                    ['2', '1'],
                ],
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
                givedAnswers: [
                    ['2', '1'],
                    ['2', '1'],
                ],
                rightAnswers: [
                    ['2', '1'],
                    ['3', '4'],
                ],
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
                givedAnswers: [
                    ['2', '1'],
                    ['2', '1'],
                ],
                rightAnswers: [
                    ['2', '1'],
                    ['2', '4'],
                ],
            },
        } as RootState;

        /** Get selector's result */
        const result = selectIsAnswerRight(state, { taskIndex: 1 });

        /** Assert selector returns right value */
        expect(result).toBeFalsy();
    });
});
