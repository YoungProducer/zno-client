/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * Component which allows user to give answers in text fields.
 */

/** Extrnal imports */
import React from 'react';
import { connect } from 'react-redux';

/** Application's imports */
import Input from 'components/Input';
import { IAnswer, ISetAnswerByIdPreparePayload, RootState } from 'store/slices';
import { selectAnswerByIndexAction } from 'store/slices/testSuite';
import { selectAnswerByTaskIndex } from 'store/selectors/testSuite';

/** Props which component get from the parent */
interface IOwnProps {
    taskIndex: number;
}

/** Props which component select from the redux-store */
interface IStateProps {
    answer: IAnswer;
}

/** Props which component can dispatch to redux-store */
interface IDispatchProps {
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) => void;
}

/** Type which describe all props which will be pushed to the component */
export type TTextAnswerProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

const Component = ({
    answer,
    taskIndex,
    selectAnswer,
}: TTextAnswerProps) => {
    return (
        <>
            { answer.selected.map((answer, index) => (
                <Input
                    key={index}
                    value={answer}
                    onChange={(event) => selectAnswer({
                        id: taskIndex,
                        answerIndex: index,
                        answer: event.target.value,
                    })}
                />
            ))}
        </>
    );
};

/** Select variables from the redux-store */
const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    answer: selectAnswerByTaskIndex(state, props),
});

/** Wrap function into dispatch */
const mapDipsatchToProps = (dispatch: any): IDispatchProps => ({
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) =>
        dispatch(selectAnswerByIndexAction(payload)),
});

/** Export configured component via HOC */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDipsatchToProps,
)(Component);
