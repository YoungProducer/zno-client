/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * Component which display main actions for tasks:
 * 'give', 'next', 'show explanation'.
 */

/** External imports */
import React, { useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { TTaskActionsProps } from './container';
import { useSearchParams } from 'hooks/useSearchParams';

/** Define Material UI classes */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginBottom: theme.spacing(1),
            width: 200,
            filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
            '&:last-child': {
                marginBottom: 0,
            },
            background: '#5b6ee9',
            '&:hover': {
                background: '#5b6ee9',
            },
        },
    }));

const useTaskActions = (props: TTaskActionsProps) => {
    const {
        giveAnswer,
        answers,
        selected,
        gived,
        taskIndex,
        setTaskIndex,
    } = props;

    let { showRightDuringTest } = useSearchParams<{ showRightDuringTest: string | boolean }>({
        searchNames: ['showRightDuringTest'],
    });

    showRightDuringTest = showRightDuringTest === 'true';

    const setNextTask = useCallback(() => {
        let nextTask: number = -1;

        for (let i = taskIndex + 1; i < answers.length; i++) {
            if (answers[i].gived.every(answer => answer === '')) {
                nextTask = i;
                break;
            }
        }

        if (nextTask === -1) {
            for (let i = 0; i < taskIndex; i++) {
                if (answers[i].gived.every(answer => answer === '')) {
                    nextTask = i;
                    break;
                }
            }
        }

        setTaskIndex(nextTask);
    }, [
        taskIndex,
        answers,
        setTaskIndex,
    ]);

    const buttonTitle = useMemo(() => {
        if (selected && !gived) return 'Відповісти';
        if (gived && showRightDuringTest) return 'Наступний';
        return 'Наступний';
    }, [showRightDuringTest, gived, selected]);

    const handleButtonClick = useCallback(() => {
        if (selected && !gived) {
            giveAnswer(taskIndex);
            return;
        }
        if (gived && showRightDuringTest) {
            setNextTask();
            return;
        }
        setNextTask();
    }, [
        selected,
        gived,
        taskIndex,
        giveAnswer,
    ]);

    return {
        handleButtonClick,
        buttonTitle,
    };
};

/** Create component */
const Component = (props: TTaskActionsProps) => {
    /** Create classes */
    const classes = useStyles({});

    const { explanationExists, selected, gived } = props;

    const {
        handleButtonClick,
        buttonTitle,
    } = useTaskActions(props);

    return (
        <>
            <Button
                className={classes.button}
                disableElevation
                color='primary'
                variant='contained'
                onClick={handleButtonClick}
            >
                {buttonTitle}
            </Button>
            <Button
                className={classes.button}
                disableElevation
                color='primary'
                variant='contained'
                disabled={!explanationExists}
            >
                Показати пояснення
            </Button>
        </>
    );
};

export default Component;