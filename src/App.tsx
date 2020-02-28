/**
 * Created by: Oleksandr Bezrukov
 * Creation date 25 February 2020
 *
 * Create main component wrapped into main providers.
 */

// External imports
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

// Application's imports
import theme from 'theme';
import store from 'store';

// Temporary
import SignUp from './components/SignUp';

const Component = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SignUp />
        </ThemeProvider>
    </Provider>
);

export default Component;
