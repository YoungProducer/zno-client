/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectsSelection route.
 */

/** External imports */
import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import AppBar from 'components/AppBar';
import SubjectsSelection from 'components/SubjectSelection';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <AppBar />
        <Container maxWidth='lg'>
            <SubjectsSelection />
        </Container>
    </React.Fragment>
);

export default Component;
