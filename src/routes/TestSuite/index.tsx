/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 22 March 2020
 *
 * Component for TestSuite route.
 */

/** External imports */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import FullPage from '../FullPage';
import TestSuite from 'components/TestSuite';
import SubjectConfiguration from 'components/TestSuiteSide/SubjectConfiguration';

const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <FullPage>
            <SubjectConfiguration />
            <TestSuite />
        </FullPage>
    </React.Fragment>
);

export default Component;
