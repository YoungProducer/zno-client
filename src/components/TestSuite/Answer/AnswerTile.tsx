/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 */

/** External imports */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { RootState, IAnswer } from 'store/slices';
import {
    selectAnswerByTaskIndex,
    selectIsAnswerSelected,
    selectIsAnswerGived,
    selectIsAnswerRight,
} from 'store/selectors/testSuite';
import {
    selectAnswerByIndexAction,
    giveAnswerByIndexAction,
    ISetAnswerByIdPreparePayload,
} from 'store/slices/testSuite';

const useStyles = makeStyles((theme: Theme) => createStyles({
    tile: {
        width: 42,
        height: 42,
        fontSize: '1.25rem',
        borderRadius: 6,
        filter: `drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))`,
        backgroundColor: '#ffffff',
        color: '#867272',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: 500,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    activeTile: {
        backgroundColor: '#5b6ee9',
        color: '#f5f5f5',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: 500,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
}));

interface IOwnProps {
    title: string;
    value: string;
    taskIndex: number;
    answerIndex: number;
}

interface IStateProps {
    answer: IAnswer;
}

interface IDispatchProps {
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) => void;
    giveAnswer: (id: number) => void;
}

export type TAnswerTileProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

const AnswerTile = ({
    answer,
    answerIndex,
    giveAnswer,
    selectAnswer,
    taskIndex,
    title,
    value,
}: TAnswerTileProps) => {
    const classes = useStyles({});

    const [active, toggleActive] = useState<boolean>(false);

    const handleOnClick = useCallback(() => {
        selectAnswer({
            answerIndex,
            id: taskIndex,
            answer: !active ? value : '',
        });
    }, [answerIndex, taskIndex, value, active]);

    useEffect(() => {
        if (answer) {
            toggleActive(answer.selected[answerIndex] === value);
        }
    }, [answer, value]);

    return (
        <ButtonBase
            className={classNames(classes.tile, {
                [classes.activeTile]: active,
            })}
            onClick={handleOnClick}
        >
            {title}
        </ButtonBase>
    );
};

const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    answer: selectAnswerByTaskIndex(state, props),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) =>
        dispatch(selectAnswerByIndexAction(payload)),

    giveAnswer: (id: number) =>
        dispatch(giveAnswerByIndexAction(id)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AnswerTile);
