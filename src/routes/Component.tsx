/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Component which contain main routes of application.
 */

/** External imports */
import React from 'react';
import { Router as Router, Route, Redirect, Switch } from 'react-router-dom';

/** Application's imports */
import AppBar from 'components/AppBar';
import PrivateRoute from 'components/PrivateRoute';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import SubjectSelection from './SubjectSelection';
import SubjectConfiguration from './SubjectConfiguration';
import { TRoutesProps } from './container';

/** Create component */
const Component = ({ isLoggedIn }: TRoutesProps) => {
    return (
        // <Router history={history}>
            <Switch>
                <PrivateRoute exact path='/'>
                    <>
                        <AppBar />
                        <h1>home</h1>
                    </>
                </PrivateRoute>
                <PrivateRoute exact path='/subject-selection'>
                    <SubjectSelection />
                </PrivateRoute>
                <PrivateRoute exact path='/subject-selection/subject-configuration'>
                    <SubjectConfiguration />
                </PrivateRoute>
                <Route exact path='/auth/signin'>
                    { isLoggedIn
                        ? <Redirect
                            to={{
                                pathname: '/subject-selection',
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
                                pathname: '/subject-selection',
                                state: { from: '/auth/signup' },
                            }}
                        />
                        : <SignUp />
                    }
                </Route>
            </Switch>
        // </Router>
    );
};

export default Component;
