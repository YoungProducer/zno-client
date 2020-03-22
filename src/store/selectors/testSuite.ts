/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Selectors for 'testSuite' slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';
import { ParametricSelector } from 'reselect';

/** Application's imports */
import { RootState } from 'store/slices';

const selectTaskIndexFromProps: ParametricSelector<RootState, any, number> = (_, props) => props.taskIndex;

export const selectTestSuiteLoading = (state: RootState) =>
    state.testSuite.loading;

export const selectTestSuiteName = (state: RootState) =>
    state.testSuite.name;

export const selectTestSuiteLimitTime = (state: RootState) =>
    state.testSuite.limitTime;

export const selectShowRightDuringTest = (state: RootState) =>
    state.testSuite.showRightDuringTest;

export const selectTestSuiteTasksImages = (state: RootState) =>
    state.testSuite.tasksImages;

export const selectTestSuiteExplanationsImages = (state: RootState) =>
    state.testSuite.explanationImages;

export const selectAnswers = (state: RootState) =>
    state.testSuite.answers;

export const selectIsAnswerSelected = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex].selected.some(answer => answer !== ''),
);

export const selectIsAnswerGived = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex].gived.every(answer => answer !== ''),
);

export const selectIsAnswerRight = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex].gived.every((answer, index) =>
            answer === answers[taskIndex].right[index]),
);

export const selectAnswerByTaskIndex = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex],
);
