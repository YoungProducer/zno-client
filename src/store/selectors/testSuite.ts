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

export const selectSelectedAnswers = (state: RootState) =>
    state.testSuite.selectedAnswers;

export const selectGivedAnswers = (state: RootState) =>
    state.testSuite.givedAnswers;

export const selectRightAnswers = (state: RootState) =>
    state.testSuite.rightAnswers;

export const selectIsAnswerSelected = createSelector(
    selectSelectedAnswers,
    selectTaskIndexFromProps,
    (selectedAnswers, taskIndex) =>
        selectedAnswers[taskIndex].some(answer => answer !== ''),
);

export const selectIsAnswerGived = createSelector(
    selectGivedAnswers,
    selectTaskIndexFromProps,
    (givedAnswers, taskIndex) =>
        givedAnswers[taskIndex].every(answer => answer !== ''),
);

export const selectIsAnswerRight = createSelector(
    selectGivedAnswers,
    selectRightAnswers,
    selectTaskIndexFromProps,
    (givedAnswers, rightAnswers, taskIndex) =>
        givedAnswers[taskIndex].every((answer, index) =>
            answer === rightAnswers[taskIndex][index]),
);

export const selectSelectedAnswerByTaskIndex = createSelector(
    selectSelectedAnswers,
    selectTaskIndexFromProps,
    (selectedAnswers, taskIndex) =>
        selectedAnswers[taskIndex]);

export const selectGivedAnswerByTaskIndex = createSelector(
    selectGivedAnswers,
    selectTaskIndexFromProps,
    (givedAnswers, taskIndex) =>
        givedAnswers[taskIndex],
);
