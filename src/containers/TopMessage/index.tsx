/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 March 2020
 *
 * Component which display messages at the top of the page.
 */

/** External imports */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

/** Application's imports */
import { selectSignInUser } from 'store/selectors/auth';
import { IUser } from 'api';
import { RootState } from 'store/slices';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderBottom: `2px solid ${yellow[600]}`,
            width: '100%',
            height: 60,
            position: 'fixed',
            top: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.7)',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
        innerContainer: {
            maxWidth: 1200,
            width: '100%',
            height: '100%',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        icon: {
            color: '#fff',
        },
        label: {
            color: '#fff',
        },
        button: {
            marginRight: theme.spacing(1),
            '&:last-child': {
                marginRight: 0,
            },
            background: 'rgba(0,0,0,0)',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
                color: '#fff',
            },
        },
    }));

interface IStateProps {
    user: IUser;
}

export type TTopMessageProps = IStateProps;

const Component = ({ user }: TTopMessageProps) => {
    const classes = useStyles({});

    const [cookies, setCookie, removeCookie] = useCookies(['emailConfirmed', 'remindEmailDate']);

    const [showMessage, setShowMessage] = useState<boolean>(false);

    useEffect(() => {
        const remindDate = new Date(cookies.remindEmailDate);
        const now = new Date();

        const cookieExist = Boolean(cookies.emailConfirmed);

        if (now.getDay() >= remindDate.getDay() && !cookieExist) {
            setShowMessage(true);
        } else {
            setShowMessage(cookies.emailConfirmed !== 'true' && cookieExist);
        }
    }, []);

    const handleAlreadyConfirmed = () => {
        removeCookie('emailConfirmed');
        removeCookie('remindEmailDate');
        setShowMessage(false);
    };

    const handleRemindLater = () => {
        const now = new Date();

        const remindDate = new Date();
        remindDate.setDate(now.getDate() + 5);

        const expires = new Date();
        expires.setDate(now.getDate() + 5);

        removeCookie('emailConfirmed');
        setCookie('remindEmailDate', remindDate, {
            expires,
        });

        setShowMessage(false);
    };

    return (
        <Grow in={showMessage}>
            <div className={classes.root}>
                <div className={classes.innerContainer}>
                    <Typography variant='h6' className={classes.label}>
                        Необхідно підтвердити емеїл адрес: {user !== null ? user.email : ''}
                    </Typography>
                    <div>
                        <Button
                            className={classes.button}
                            variant='outlined'
                            onClick={handleAlreadyConfirmed}
                        >
                            Я вже підтвердив свій емеїл адрес
                        </Button>
                        <Button
                            className={classes.button}
                            variant='outlined'
                            onClick={handleRemindLater}
                        >
                            Нагадати потім
                        </Button>
                    </div>
                </div>
            </div>
        </Grow>
    );
};

const mapStateToProps = (state: RootState): IStateProps => ({
    user: selectSignInUser(state),
});

export default connect<IStateProps, {}>(
    mapStateToProps,
    null,
)(Component);
