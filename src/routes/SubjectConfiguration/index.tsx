/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectConfiguration route.
 */

/** External imports */
import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import FullPage from '../FullPage';
import AppBar from 'components/AppBar';
import SubjectSelection from 'components/SubjectSelection';
import SubjectConfiguration from 'components/TestSuiteSide/SubjectConfiguration';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        {/* <AppBar /> */}
        {/* <Container maxWidth='lg'> */}
        <FullPage>
            <SubjectConfiguration />
        </FullPage>
            {/* <SubjectSelection /> */}
        {/* </Container> */}
    </React.Fragment>
);

export default Component;
