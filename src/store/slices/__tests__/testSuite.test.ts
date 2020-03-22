/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Create test suites related to TestSuite slice.
 */

/** Application's imports */
import testSuite, {
    testSuiteLoadingAction,
    setTestSuiteNameAction,
    showRightDuringTestAction,
    limitTestSuiteTimeAction,
    setTasksImagesAction,
    setExplanationsImagesAction,
    setRightAnswersAction,
    setAnswersAction,
    selectAnswerByIndexAction,
    giveAnswerByIndexAction,
    ITestSuiteInitialState,
} from '../testSuite';

describe('TestSuite slice', () => {
    test(`setTestSuiteNameAction without payload should set name to empty string`, () => {
        /** Define initial state */
        const initialState = {
            name: 'foo',
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setTestSuiteNameAction());

        /** Assert name is empty string */
        expect(result.name).toBe('');
    });

    test(`setTestSuiteNameAction with two defined propertes should set name as theme`, () => {
        /** Define initial state */
        const initialState = {
            name: '',
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setTestSuiteNameAction({
            session: 'foo',
            theme: 'bar',
        }));

        /** Assert name is empty string */
        expect(result.name).toBe('bar');
    });

    test(`setTestSuiteNameAction with empty object should set name to empty string`, () => {
        /** Define initial state */
        const initialState = {
            name: '',
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, setTestSuiteNameAction({}));

        /** Assert name is empty string */
        expect(result.name).toBe('');
    });

    test('setTestSuiteNameAction with payloads which have null properties should correctly sets name of test suite', () => {
        /** Define initial state */
        const ininitalState = {
            name: '',
        } as ITestSuiteInitialState;

        /** Dispatch actions with different payloads */
        const result_1 = testSuite(ininitalState, setTestSuiteNameAction({
            theme: 'foo',
            session: null,
            training: null,
        }));

        const result_2 = testSuite(ininitalState, setTestSuiteNameAction({
            theme: null,
            session: 'bar',
            training: null,
        }));

        const result_3 = testSuite(ininitalState, setTestSuiteNameAction({
            theme: null,
            session: null,
            training: 'abc',
        }));

        /** Assert all actions set right value */
        expect(result_1.name).toBe('foo');
        expect(result_2.name).toBe('bar');
        expect(result_3.name).toBe('abc');
    });

    test('setTestSuiteNameAction with payloads which have undefined properties should correctly sets name of test suite', () => {
        /** Define initial state */
        const ininitalState = {
            name: '',
        } as ITestSuiteInitialState;

        /** Dispatch actions with different payloads */
        const result_1 = testSuite(ininitalState, setTestSuiteNameAction({
            theme: 'foo',
        }));

        const result_2 = testSuite(ininitalState, setTestSuiteNameAction({
            session: 'bar',
        }));

        const result_3 = testSuite(ininitalState, setTestSuiteNameAction({
            training: 'abc',
        }));

        /** Assert all actions set right value */
        expect(result_1.name).toBe('foo');
        expect(result_2.name).toBe('bar');
        expect(result_3.name).toBe('abc');
    });

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

    test('selectAnswerByIndexAction with payload for tasks with one right answer should correctly set it to state', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, selectAnswerByIndexAction({
            id: 0,
            answer: '0',
        }));

        /** Assert selectedAnswers has right keys */
        expect(result.selectedAnswers).toEqual([['0']]);
    });

    test('selectAnswerByIndexAction with payload for tasks with many right answers should correctly set it to state', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['', '', '', '']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, selectAnswerByIndexAction({
            id: 0,
            answerIndex: 2,
            answer: '0',
        }));

        /** Assert selectedAnswers has right keys */
        expect(result.selectedAnswers).toEqual([['', '', '0', '']]);
    });

    test('selectAnswerByIndexAction without answer prop in payload should set current answer to default', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['', '1']],
            givedAnswers: [['', '']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, selectAnswerByIndexAction({
            id: 0,
            answerIndex: 1,
        }));

        /** Assert selectedAnswers property has right keys */
        expect(result.selectedAnswers).toEqual([['', '']]);
    });

    test('selectAnswerByIndexAction without answer prop should also set gived answer to default', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['3', '1']],
            givedAnswers: [['', '']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, selectAnswerByIndexAction({
            id: 0,
            answerIndex: 1,
        }));

        /** Assert givedAnswers property has right keys */
        expect(result.givedAnswers).toEqual([['', '']]);
    });

    test('giveAnswerByIndexAction should set to givedAnswers answer array identical to array in selectedAnswers', () => {
        /** Define initial state */
        const initialState = {
            selectedAnswers: [['3', '1']],
            givedAnswers: [['', '']],
        } as ITestSuiteInitialState;

        /** Dispatch action and get new state */
        const result = testSuite(initialState, giveAnswerByIndexAction(0));

        /** Assert givedAnswers property has right keys */
        expect(result.givedAnswers).toEqual([['3', '1']]);
    });
});
