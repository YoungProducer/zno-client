/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component for SubjectsSelection route.
 */

/** External imports */
import React from 'react';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';

/** Application's imports */
import SubjectSelection from 'components/SubjectSelection';
import TopMessage from 'containers/TopMessage';
import favicon from 'public/images/favicon.ico';

/** Create component */
const Component = () => (
    <React.Fragment>
        <CssBaseline />
        <Helmet
            defaultTitle='Видавництво "Підручники і посібники"'
            titleTemplate='Видавництво "Підручники і посібники" - %s'
            link={[
                { rel: 'shortcut icon', href: favicon },
            ]}
        />
        {/* <TopMessage /> */}
        <SubjectSelection />
    </React.Fragment>
);

export default Component;
