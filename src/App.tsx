/**
 * Created by: Oleksandr Bezrukov
 * Creation date 25 February 2020
 *
 * Create main component wrapped into main providers.
 */

// External imports
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

// Application's imports
import Routes from 'routes';
import history from 'routes/history';
import theme from 'theme';
import store from 'store';

/** Create App component */
const Component = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Routes />
            </Router>
        </ThemeProvider>
    </Provider>
);

export default Component;
