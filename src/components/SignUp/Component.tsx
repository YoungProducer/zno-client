/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 25 February 2020
 *
 * Component which allows create user's account.
 */

// External imports
import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TSignUpProps } from './container';
import NavigationLink from 'components/NavigationLink';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    backdrop: {
        background: '#fff',
        width: '100%',
        height: '100vh',
    },
    root: {
        position: 'fixed',
        padding: 15,
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
        width: 'min-content',
    },
    textField: {
        width: 230,
    },
    fields: {
        paddingBottom: theme.spacing(3),
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    block: {
        width: 'max-content',
    },
    button: {
        width: 230,
    },
    link: {
        color: theme.palette.primary.main,
    },
}));

/**
 * Create hook to make component stateless.
 * Compute all values from text fields.
 * Returns fields data and button onClick property.
 */
const useSignUpElements = (props: TSignUpProps) => {
    const {
        errorFields,
        fieldsMessages,
        fetchSignUp,
        setSignUpErrorFieldsToDefault,
        setSignUpFieldsMessagesToDefault,
    } = props;

    const clearFields = () => {
        setSignUpErrorFieldsToDefault();
        setSignUpFieldsMessagesToDefault();
    };

    /** User email */
    const [email, setEmail] = useState<string>('');
    const handleChangeEmail =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            if (errorFields.email) {
                clearFields();
            }
        }, [errorFields.email]);

    /** User password */
    const [password, setPassword] = useState<string>('');
    const handleChangePassword =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            if (errorFields.password) {
                clearFields();
            }
        }, [errorFields.password]);

    /** Confirmation password, should be the same to the password */
    const [confPassword, setConfPassword] = useState<string>('');
    const handleChangeConfPassword =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setConfPassword(event.target.value);
            if (errorFields.confPassword) {
                clearFields();
            }
        }, [errorFields.confPassword]);

    /** SignUp button handle */
    const handleFetchSignUp = useCallback(() => fetchSignUp({
        email,
        password,
        confPassword,
    }), [email, password, confPassword]);

    return {
        emailField: {
            onChange: handleChangeEmail,
            value: email,
            error: errorFields.email,
            helperText: fieldsMessages.email,
        },
        passwordField: {
            onChange: handleChangePassword,
            value: password,
            error: errorFields.password,
            helperText: fieldsMessages.password,
        },
        confPasswordField: {
            onChange: handleChangeConfPassword,
            value: confPassword,
            error: errorFields.confPassword,
            helperText: fieldsMessages.confPassword,
        },
        signUpButton: {
            onClick: handleFetchSignUp,
        },
    };
};

const Component = (props: TSignUpProps) => {
    /** Create object with classes to use them */
    const classes = useStyles({});

    /** Get fields data from hook */
    const {
        emailField,
        passwordField,
        confPasswordField,
        signUpButton,
    } = useSignUpElements(props);

    return (
        <div className={classes.backdrop}>
            <Paper
                className={classes.root}
                elevation={2}
                square
            >
                <Typography
                    color='primary'
                    variant='h6'
                    align='center'
                >
                    Реєстрація
                </Typography>
                <Grid
                    container
                    direction='row'
                    spacing={2}
                    className={classes.fields}
                >
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        item
                        spacing={3}
                        className={classes.block}
                    >
                        <Grid item>
                            <TextField
                                className={classes.textField}
                                color='primary'
                                label='Емеїл'
                                type='email'
                                { ...emailField }
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                className={classes.textField}
                                color='primary'
                                label='Пароль'
                                type='password'
                                { ...passwordField }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                        item
                        spacing={3}
                        className={classes.block}
                    >
                        <Grid item>
                            <TextField
                                className={classes.textField}
                                color='primary'
                                label='Пароль підтвердження'
                                type='password'
                                { ...confPasswordField }
                                { ...{ 'data-testid': 'conf-password' } }
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                color='primary'
                                variant='contained'
                                disableElevation
                                className={classes.button}
                                data-testid='signup-button'
                                { ...signUpButton }
                            >
                                Зареєструватися
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography align='center'>
                    Вже зареєстровані?
                    <NavigationLink
                        navLink={{
                            to: '/auth/signin',
                        }}
                        className={classes.link}
                    >
                        Увійти
                    </NavigationLink>
                </Typography>
            </Paper>
        </div>
    );
};

export default Component;
