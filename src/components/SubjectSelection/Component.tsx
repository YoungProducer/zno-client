/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component to select subjects.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles, Collapse } from '@material-ui/core';

/** Application's imports */
import { TSubjectSelectionProps } from './container';
import SubjectPresentation from './SubjectsPresentation';
import Logo from 'img/logo';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100vh',
    },
    container: {
        display: 'flex',
        marginTop: theme.spacing(10),
    },
    searchBlock: {
        width: '50%',
    },
    popularBlock: {
        background: '#5c498c',
        height: 85,
        width: 'max-content',
        position: 'absolute',
        bottom: '1%',
        right: 0,
        left: 0,
        margin: 'auto',
        borderRadius: 7,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    popularBlockInner: {
        height: 'inherit',
        width: '100%',
    },
    searchWrapper: {
        position: 'relative',
    },
    searchInput: {
        width: '100%',
        height: 67,
        background: '#4d8fcb',
        borderRadius: 34,
        paddingLeft: theme.spacing(2),
        paddingRight: 6,
        color: '#fff',
        fontSize: '1.3rem',
        marginTop: theme.spacing(8),
        zIndex: 1000,
        boxShadow: `0px 4px 2px -2px rgba(0, 0, 0, 0.1)`,
    },
    iconButton: {
        width: 55,
        height: 55,
        background: '#fff',
        borderRadius: '50%',
        '&:hover': {
            background: '#f1f1f1',
        },
    },
    icon: {
        color: '#5955cf',
        width: 30,
        height: 30,
    },
    typography: {
        color: '#fff',
    },
    actionsBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    appBar: {
        background: 'none',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    appBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    appBarActions: {

    },
    signInButton: {
        borderRadius: 25,
        background: '#fff',
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        lineHeight: '50px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        '&:hover': {
            background: '#f1f1f1',
        },
        minWidth: 100,
    },
    signUpButton: {
        minWidth: 100,
        lineHeight: '50px',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '0.875rem',
        color: '#fff',
        marginRight: theme.spacing(2),
        '&:hover': {
            background: 'none',
        },
    },
    logoutButton: {
        borderRadius: 25,
        background: '#fff',
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&:hover': {
            background: '#f1f1f1',
        },
        minWidth: 100,
    },
    collapse: {
        position: 'absolute',
        marginTop: -34,
        width: '100%',
    },
    collapseInner: {
        padding: theme.spacing(2, 0),
        paddingTop: 50,
        background: '#4d8fcb',
        width: '100%',
        overflow: 'hidden',
        borderBottomRightRadius: 34,
        borderBottomLeftRadius: 34,
        boxShadow: `0px 4px 2px -2px rgba(0, 0, 0, 0.1)`,
        '& p': {
            color: '#fff',
            fontSize: '1.2rem',
            padding: theme.spacing(0.5, 1),
            cursor: 'pointer',
            transition: theme.transitions.create('background', {
                easing: theme.transitions.easing.easeInOut,
                duration: 300,
            }),
        },
        '& p:hover': {
            background: 'rgba(0, 0, 0, 0.1)',
        },
    },
}));

/** Create component */
const Component = (props: TSubjectSelectionProps) => {
    const classes = useStyles({});

    const history = useHistory();

    const {
        subjectsList,
        loggedIn,
        fetchSubjectsNames,
        fetchLogout,
    } = props;

    const [displayList, setDisplayList] = useState<boolean>(false);
    const [seachValue, setSearchValue] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);

    useEffect(() => {
        fetchSubjectsNames();
    }, []);

    const filteredSubjects = subjectsList.filter(subject =>
        subject.name.toLowerCase().includes(seachValue.toLowerCase()));

    const displayFilteredSubjects =
        filteredSubjects.length !== 0 &&
        displayList;

    return (
        <>
            <div className={classNames(classes.root, 'subject-selection-background')}>
                <AppBar elevation={0} className={classes.appBar} position='relative'>
                    <Container maxWidth='lg' className={classes.appBarContainer}>
                        <Logo />
                        <div className={classes.appBarContainer}>
                            { !loggedIn && (
                                <>
                                    <NavLink
                                        to='/auth/signup'
                                        className={classes.signUpButton}
                                    >
                                        Зареєструватися
                                    </NavLink>
                                    <NavLink
                                        to='/auth/signin'
                                        className={classes.signInButton}
                                    >
                                        Увійти
                                    </NavLink>
                                </>
                            )}
                            { loggedIn && (
                                <Button
                                    variant='text'
                                    className={classes.logoutButton}
                                    onClick={fetchLogout}
                                >
                                    Вийти
                                </Button>
                            )}
                        </div>
                    </Container>
                </AppBar>
                <Container maxWidth='lg' className={classes.container}>
                    <div className={classes.actionsBlock}>
                        <div className={classes.searchBlock}>
                            <Typography
                                variant='h6'
                                className={classes.typography}
                            >
                                Для того, щоб розпочати тест, почніть вводити назву предмету у пошуку. Після цього ви одразу побачите цей предмет
                                у правому блоці. Просто натисніть на нього, і ви будете направлені на сторінку тесту.
                            </Typography>
                            <div className={classes.searchWrapper}>
                                <InputBase
                                    className={classes.searchInput}
                                    placeholder='Знайти предмет'
                                    value={seachValue}
                                    onChange={handleSearchChange}
                                    endAdornment={
                                        <IconButton
                                            size='small'
                                            className={classes.iconButton}
                                        >
                                            <SearchIcon
                                                className={classes.icon}
                                            />
                                        </IconButton>
                                    }
                                    onFocus={() => setDisplayList(true)}
                                    onBlur={() => setDisplayList(false)}
                                />
                                <Collapse
                                    in={displayFilteredSubjects}
                                    className={classes.collapse}
                                >
                                    <div className={classes.collapseInner}>
                                        {filteredSubjects.map(subject => (
                                            <Typography
                                                key={subject.id}
                                                onClick={() => setSearchValue(subject.name)}
                                            >
                                                {subject.name}
                                            </Typography>
                                        ))}
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <SubjectPresentation
                            subjectsList={subjectsList}
                            searchValue={seachValue}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Component;
