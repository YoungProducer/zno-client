/**
 * Created by: Oleksandr Bezrukov
 * Creation date 25 February 2020
 *
 * Create main component wrapped into main providers.
 */

// External imports
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// Application's imports
import theme from 'theme';

// Temporary
import SignUp from './components/SignUp';

const Component = () => (
    <ThemeProvider theme={theme}>
        <SignUp />
    </ThemeProvider>
);

export default Component;
