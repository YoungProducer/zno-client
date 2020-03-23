/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which download images for test suite
 * display answers and allow to pass different test suites.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { TTestSuiteProps } from './container';
import { ITestSuiteCredentials } from 'api';
import Answer from './Answer';
import TaskSelection from './TaskSelection';

/** Define Material classes as hook */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(4),
        },
        title: {
            fontSize: '1.4375rem',
            color: '#b19898',
        },
        img: {

        },
        answersBlock: {

        },
        tasksSelectionBlock: {
            marginTop: theme.spacing(3),
        },
    }));

const useSearch = () => {
    /** Define posible search params array */
    const searchNames = ['subjectId', 'subSubjectId', 'theme', 'session', 'training'];

    /** Get location */
    const location = useLocation();

    /** Get search */
    const search = location.search;

    /** Create search params instance */
    const searchParams = new URLSearchParams(search);

    /** Extract data from search */
    const searchData = searchNames.reduce((acc, curr) => {
        const param = searchParams.get(curr);

        if (param !== null) {
            return {
                ...acc,
                [curr]: param,
            };
        }

        return acc;
    }, {});

    return searchData as ITestSuiteCredentials;
};

const useInitTestSuite = (props: TTestSuiteProps) => {
    /** Extract props */
    const { fetchTestSuite } = props;

    /** Get search data */
    const searchData = useSearch();

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
    const { answers, name, tasksImages } = props;

    useInitTestSuite(props);

    const { task } = useTestSuiteFileds(props);

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>{name}</Typography>
            <img
                className={classes.img}
                src={tasksImages[task.current]}
            />
            <div className={classes.answersBlock}>
                { answers.length !== 0 &&
                    <Answer
                        type={answers[task.current].type}
                        taskIndex={task.current}
                    />
                }
            </div>
            <div className={classes.tasksSelectionBlock}>
                <TaskSelection />
            </div>
        </div>
    );
};

export default Component;
