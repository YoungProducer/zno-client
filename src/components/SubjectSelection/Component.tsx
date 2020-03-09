/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component to select subjects.
 */

/** External imports */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CSSBaseLine from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

/** Application's imports */
import { TSubjectSelectionProps } from './container';
import SubjectTile from './SubjectTile';

/** Create component */
const Component = (props: TSubjectSelectionProps) => {
    const {
        classes,
        subjectsList,
        fetchSubjectsNames,
    } = props;

    useEffect(() => {
        fetchSubjectsNames();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {subjectsList.map((subject, index) => (
                    <SubjectTile
                        key={index}
                        subject={subject}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default Component;
