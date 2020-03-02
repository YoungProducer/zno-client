/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Tile with subject name.
 */

/** External imports */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

/** Define classes as hook */
const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        borderRadius: 0,
        background: green[700],
        color: '#fff',
        width: '100%',
        height: 100,
        '&:hover': {
            background: green[800],
        },
    },
}));

export interface ISubjectProps {
    /**
     * Subject name.
     */
    subject: string;
}

/** Create component */
const Component = ({ subject }: ISubjectProps) => {
    /** Create classes variable */
    const classes = useStyles({});

    return (
        <Grid item xs={3}>
            <Button className={classes.button}>{subject}</Button>
        </Grid>
    );
};

export default Component;