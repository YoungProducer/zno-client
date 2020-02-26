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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'fixed',
        padding: 15,
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`,
    },
    textField: {
        marginRight: theme.spacing(3),
        '&:last-child': {
            marginRight: 0,
        },
    },
    fields: {
        paddingBottom: theme.spacing(3),
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

const Component = () => {
    // Create object with classes to use its
    const classes = useStyles({});

    const [email, setEmail] = useState<string>('');
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const [password, setPassword] = useState<string>('');
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    return (
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
            <div className={classes.fields}>
                <TextField
                    className={classes.textField}
                    color='primary'
                    label='Емеїл'
                    value={email}
                    onChange={handleChangeEmail}
                />
                <TextField
                    className={classes.textField}
                    color='primary'
                    label='Пароль'
                    value={password}
                    onChange={handleChangePassword}
                />
            </div>
            <div className={classes.actions}>
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                >
                    Зареєструватися
                </Button>
                <Typography>
                    Вже зареєстровані?
                </Typography>
                <Typography
                    color='primary'
                >
                    Увійти
                </Typography>
            </div>
        </Paper>
    );
};

export default Component;
