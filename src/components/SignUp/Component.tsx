/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 25 February 2020
 *
 * Component which allows create user's account.
 */

// External imports
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TSignUpProps } from './container';

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
        // marginRight: theme.spacing(3),
        // '&:last-child': {
        //     marginRight: 0,
        // },
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
}));

const Component = ({
    errorFields,
    fieldsMessages,
    loading,
    fetchSignUp,
    setSignUpErrorFieldsToDefault,
    setSignUpFieldsMessagesToDefault,
}: TSignUpProps) => {
    // Create object with classes to use its
    const classes = useStyles({});

    // User email
    const [email, setEmail] = useState<string>('');
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value);

    // User password
    const [password, setPassword] = useState<string>('');
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

    // Confirmation password, should be the same to the password
    const [confPassword, setConfPassword] = useState<string>('');
    const handleChangeConfPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
        setConfPassword(event.target.value);

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
                                value={email}
                                onChange={handleChangeEmail}
                                error={errorFields.email}
                                helperText={fieldsMessages.email}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                className={classes.textField}
                                color='primary'
                                label='Пароль'
                                value={password}
                                onChange={handleChangePassword}
                                error={errorFields.password}
                                helperText={fieldsMessages.password}
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
                                value={confPassword}
                                onChange={handleChangeConfPassword}
                                error={errorFields.confPassword}
                                helperText={fieldsMessages.confPassword}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                color='primary'
                                variant='contained'
                                disableElevation
                                className={classes.button}
                            >
                                Зареєструватися
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <div className={classes.actions}> */}
                    <Typography align='center'>
                        Вже зареєстровані?
                        <Typography
                            color='primary'
                            component='span'
                        >
                            Увійти
                        </Typography>
                    </Typography>
                {/* </div> */}
            </Paper>
        </div>
    );
};

export default Component;
