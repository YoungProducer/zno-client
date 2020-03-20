/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Create test suites related to TestSuite slice.
 */

/** Application's imports */
import testSuite, {
    testSuiteLoadingAction,
    showRightDuringTestAction,
    limitTestSuiteTimeAction,
    setTasksImagesAction,
    setExplanationsImagesAction,
    setRightAnswersAction,
    setAnswersAction,
    ITestSuiteInitialState,
} from '../testSuite';

describe('TestSuite slice', () => {
    test('setTasksImagesAction with payload should set payload to state', () => {
        /** Define initial state */
        const initialState = {
            tasksImages: [],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setTasksImagesAction(['foo']));

        /** Assert taskImages property has right values */
        expect(result.tasksImages).toEqual(['foo']);
    });

    test('setTasksImagesAction without payload should set taskImages property to []', () => {
        /** Define initial state */
        const initialState = {
            tasksImages: ['foo'],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setTasksImagesAction());

        /** Assert taskImages property is empty array */
        expect(result.tasksImages).toHaveLength(0);
    });

    test('setExplanationsImagesAction with payload should set payload to state', () => {
        /** Define initial state */
        const initialState = {
            explanationImages: [],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setExplanationsImagesAction(['foo']));

        /** Assert explanationImages property has right values */
        expect(result.explanationImages).toEqual(['foo']);
    });

    test('setExplanationsImagesAction without payload should set explanationImages property to []', () => {
        /** Define initial state */
        const initialState = {
            explanationImages: ['foo'],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setExplanationsImagesAction());

        /** Assert explanationImages property is empty array */
        expect(result.explanationImages).toHaveLength(0);
    });

    test('setRightAnswersAction with payload should set payload to state', () => {
        /** Define initial state */
        const initialState = {
            rightAnswers: [],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setRightAnswersAction([['foo']]));

        /** Assert rightAnswers property has right values */
        expect(result.rightAnswers).toEqual([['foo']]);
    });

    test('setRightAnswersAction without payload should set rightAnswers property to []', () => {
        /** Define initial state */
        const initialState = {
            rightAnswers: [['foo']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setRightAnswersAction());

        /** Assert rightAnswers property is empty array */
        expect(result.rightAnswers).toHaveLength(0);
    });

    test(`setAnswersAction with payload should set the same array but with replaced elements to ''`, () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [],
            givedAnswers: [],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setAnswersAction([['foo']]));

        /** Assert selectedAnswers and givedAnswers has right values */
        expect(result.selectedAnswers).toEqual([['']]);
        expect(result.givedAnswers).toEqual([['']]);
    });

    test('setAnswersAction without payload should set empty array to selectedAnswers and givedAnswers props', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['']],
            givedAnswers: [['']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setAnswersAction());

        /** Assert selectedAnswers and givedAnswers are empty arrays */
        expect(result.selectedAnswers).toHaveLength(0);
        expect(result.givedAnswers).toHaveLength(0);
    });
});
