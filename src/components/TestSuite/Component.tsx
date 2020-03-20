/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which download images for test suite
 * display answers and allow to pass different test suites.
 */

/** External imports */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Define Material classes as hook */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        img: {

        },
        answersBlock: {

        },
        tasksSelectionBlock: {

        },
    }));

const Component = () => {
    /** Init classes */
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <Typography>Тема 1</Typography>
            <img className={classes.img}/>
            <div className={classes.answersBlock}>
            </div>
            <div className={classes.tasksSelectionBlock}>
            </div>
        </div>
    );
};

export default Component;
