/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Component which contain main routes of application.
 */

/** External imports */
import React from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

/** Application's imports */
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import PrivateRoute from 'components/PrivateRoute';
import { TRoutesProps } from './container';
import history from './history';

/** Create component */
const Component = ({ isLoggedIn }: TRoutesProps) => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path='/'>
                    <h1>home</h1>
                </PrivateRoute>
                <Route exact path='/auth/signin'>
                    { isLoggedIn
                        ? <Redirect
                            to={{
                                pathname: '/home',
                                state: { from: '/auth/signin' },
                            }}
                        />
                        : <SignIn />
                    }
                </Route>
                <Route exact path='/auth/signup'>
                    { isLoggedIn
                        ? <Redirect
                            to={{
                                pathname: '/home',
                                state: { from: '/auth/signup' },
                            }}
                        />
                        : <SignUp />
                    }
                </Route>
            </Switch>
        </Router>
    );
};

export default Component;
