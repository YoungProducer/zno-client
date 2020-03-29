/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectsSelection route.
 */

/** External imports */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import SubjectSelection from 'components/SubjectSelection';
import TopMessage from 'containers/TopMessage';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <TopMessage />
        <SubjectSelection />
    </React.Fragment>
);

export default Component;
