/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Tile with subject name.
 */

/** External imports */
import React from 'react';
import { useHistory } from 'react-router-dom';
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

export interface ISubjectTileProps {
    /**
     * Subject name.
     */
    subject: string;
}

/** Create component */
const Component = ({ subject }: ISubjectTileProps) => {
    /** Create classes variable */
    const classes = useStyles({});

    const history = useHistory();

    const clickHandle = () => {
        history.push(`/subject-selection/subject-configuration?subject=${subject}`);
    };

    return (
        <Grid item xs={3}>
            <Button
                className={classes.button}
                onClick={clickHandle}
                data-testid='subject-tile-button'
            >
                {subject}
            </Button>
        </Grid>
    );
};

export default Component;
