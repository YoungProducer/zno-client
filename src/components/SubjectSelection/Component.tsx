/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component to select subjects.
 */

/** External imports */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

/** Application's imports */
import { TSubjectSelectionProps } from './container';
import SubjectTile from './SubjectTile';
import SubjectPresentation from './SubjectsPresentation';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100vh',
    },
    container: {
        display: 'flex',
    },
    searchBlock: {
        width: '50%',
    },
    popularBlock: {
        background: '#5c498c',
        height: 85,
        width: 'max-content',
        position: 'absolute',
        // bottom: '1%',
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
    searchInput: {
        width: '90%',
        height: 67,
        background: '#4d8fcb',
        borderRadius: 34,
        paddingLeft: theme.spacing(2),
        paddingRight: 6,
        color: '#fff',
        fontSize: '1.3rem',
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
}));

/** Create component */
const Component = (props: TSubjectSelectionProps) => {
    const classes = useStyles({});

    const {
        // classes,
        subjectsList,
        fetchSubjectsNames,
    } = props;

    useEffect(() => {
        fetchSubjectsNames();
    }, []);

    return (
        <>
            <div className={classNames(classes.root, 'subject-selection-background')}>
                <Container maxWidth='lg' className={classes.container}>
                    <div className={classes.searchBlock}>
                        <InputBase
                            className={classes.searchInput}
                            placeholder='Знайти предмет'
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
                        />
                    </div>
                    <SubjectPresentation />
                </Container>
            </div>
            {/* <div className={classes.popularBlock}>
                <SubjectTile
                    subject={subjectsList[0]}
                />
                <SubjectTile
                    subject={subjectsList[1]}
                />
            </div> */}
        </>
    );
};

export default Component;
