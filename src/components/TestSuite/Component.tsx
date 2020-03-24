/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which download images for test suite
 * display answers and allow to pass different test suites.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { useSearchParams } from 'hooks/useSearchParams';
import { TTestSuiteProps } from './container';
import { ITestSuiteCredentials } from 'api';
import Answer from './Answer';
import TaskSelection from './TaskSelection';
import TaskActions from './TaskActions';

/** Define Material classes as hook */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // paddingTop: theme.spacing(4),
            height: '100%',
            position: 'relative',
        },
        title: {
            fontSize: '1.5375rem',
            color: '#b19898',
            padding: theme.spacing(2),
            background: '#fff',
            borderRadius: 16,
        },
        img: {
            maxHeight: '40vh',
            borderRadius: 16,
            background: '#fff',
            marginTop: theme.spacing(1.5),
        },
        answersBlock: {
            padding: theme.spacing(1),
            borderRadius: 16,
            background: '#fff',
            margin: 0,
            width: '100%',
            marginTop: theme.spacing(1),
        },
        tasksSelectionBlock: {
            marginTop: theme.spacing(3),
            position: 'absolute',
            bottom: 0,
            width: '100%',
        },
    }));

const useInitTestSuite = (props: TTestSuiteProps) => {
    /** Extract props */
    const { fetchTestSuite } = props;

    /** Define posible search params array */
    const searchNames = ['subjectId', 'subSubjectId', 'theme', 'session', 'training'];

    /** Get search data */
    const searchData = useSearchParams<ITestSuiteCredentials>({ searchNames });

    useEffect(() => {
        fetchTestSuite(searchData);
    }, []);
};

const useTestSuiteFileds = (props: TTestSuiteProps) => {
    const [currentTask, setCurrentTask] = useState<number>(0);

    return {
        task: {
            current: currentTask,
            set: setCurrentTask,
        },
    };
};

const Component = (props: TTestSuiteProps) => {
    /** Init classes */
    const classes = useStyles({});

    /** Destruct props */
    const { answers, name, tasksImages, explanationsImages } = props;

    useInitTestSuite(props);

    const { task } = useTestSuiteFileds(props);

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>{name}</Typography>
            <img
                className={classes.img}
                src={tasksImages[task.current]}
            />
            <Grid container spacing={2} direction='column' className={classes.answersBlock}>
                { answers.length !== 0 &&
                    <>
                        <Grid item>
                            <Answer
                                type={answers[task.current].type}
                                taskIndex={task.current}
                            />
                        </Grid>
                        <Grid item>
                            <TaskActions
                                taskIndex={task.current}
                                explanationExists={Boolean(explanationsImages[task.current])}
                                setTaskIndex={task.set}
                            />
                        </Grid>
                    </>
                }
            </Grid>
            <div className={classes.tasksSelectionBlock}>
                <TaskSelection
                    tasksAmount={answers.length}
                    activeTask={task.current}
                    setTaskIndex={task.set}
                />
            </div>
        </div>
    );
};

export default Component;
