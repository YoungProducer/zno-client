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
import SubjectSelection from 'components/SubjectSelection';
import SubjectConfiguration from 'components/TestSuiteSide/SubjectConfiguration';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        {/* <AppBar /> */}
        {/* <Container maxWidth='lg'> */}
            {/* <SubjectConfiguration /> */}
            <SubjectSelection />
        {/* </Container> */}
    </React.Fragment>
);

export default Component;
