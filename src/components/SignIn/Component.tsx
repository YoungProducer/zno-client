/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 February 2020
 *
 * Component which allows user to make sign in
 */

/** External imports */
import React, { useCallback, memo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { TSignInProps } from './container';
import NavigationLink from 'components/NavigationLink';

/** Define classes as hook */
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
    buttonBlock: {
        width: '100%',
        marginTop: theme.spacing(2),
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
const useSignInElements = (props: TSignInProps) => {
    const {
        errorFields,
        fieldsMessages,
        fetchSignIn,
        setSignInErrorFieldsToDefault,
        setSignInFieldsMessagesToDefault,
    } = props;

    const clearFields = () => {
        setSignInErrorFieldsToDefault();
        setSignInFieldsMessagesToDefault();
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

    /** SignUp button handle */
    const handleFetchSignIn = useCallback(() => fetchSignIn({
        email,
        password,
    }), [email, password]);

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
        signInButton: {
            onClick: handleFetchSignIn,
        },
    };
};

/** Create component */
const Component = (props: TSignInProps) => {
    /** Create styles */
    const classes = useStyles({});

    /** Get fields data from hook */
    const { emailField, passwordField, signInButton } = useSignInElements(props);

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
                    Вхід
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
                        justify='center'
                        item
                        className={classes.buttonBlock}
                    >
                        <Button
                            color='primary'
                            variant='contained'
                            disableElevation
                            className={classes.button}
                            data-testid='signin-button'
                            { ...signInButton }
                        >
                            Увійти
                        </Button>
                    </Grid>
                </Grid>
                <Typography align='center'>
                    Не зареєстровані?
                    <NavigationLink
                        navLink={{
                            to: '/auth/signup',
                        }}
                        className={classes.link}
                    >
                        Зареєструватися
                    </NavigationLink>
                </Typography>
            </Paper>
        </div>
    );
};

export default Component;
