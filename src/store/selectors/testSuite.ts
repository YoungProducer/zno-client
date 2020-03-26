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
import { RootState, IAnswer } from 'store/slices';

const selectTaskIndexFromProps: ParametricSelector<RootState, any, number> = (_, props) => props.taskIndex;

export const selectTestSuiteLoading = (state: RootState) =>
    state.testSuite.loading;

export const selectTestSuiteName = (state: RootState) =>
    state.testSuite.name;

export const selectTestSuiteFinished = (state: RootState) =>
    state.testSuite.finished;

export const selectTestSuiteTasksImages = (state: RootState) =>
    state.testSuite.tasksImages;

export const selectTestSuiteExplanationsImages = (state: RootState) =>
    state.testSuite.explanationImages;

export const selectAnswers = (state: RootState) =>
    state.testSuite.answers;

export const selectAnswersAmount = (state: RootState) =>
    state.testSuite.answers.length;

const isAnswerSelectedByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].selected.some(answer => answer !== '')
        : false;

export const selectIsAnswerSelected = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerSelectedByTaskIndex,
);

const isAnswerGivedByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].gived.every(answer => answer !== '')
        : false;

export const selectIsAnswerGived = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerGivedByTaskIndex,
);

const isAnswerRightByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].gived.every((answer, index) =>
            answer === answers[taskIndex].right[index])
        : false;

export const selectIsAnswerRight = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerRightByTaskIndex,
);

export const selectAnswerByTaskIndex = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex],
);

export const selectAmountOfSelectedAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerSelectedByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);

export const selectAmountOfGivedAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerGivedByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);

export const selectAmountOfRightAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerRightByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);
