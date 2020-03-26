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
import TestSuiteStats from 'components/TestSuiteSide/TestSuiteStats';

const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <FullPage
            side={<TestSuiteStats/>}
            content={<TestSuite />}
        />
    </React.Fragment>
);

export default Component;
