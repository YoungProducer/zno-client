/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Component which allows to configure test options
 * and allows to select which test you want to complete.
 */

/** External imports */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

/** Application's imports */
import {
    TTestTypes,
    ETestTypes,
    TSubjectConfigurationModalProps,
} from './container';

/** Define Material UI styles as hook */

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
    });

/** Create components wrapped by withStyles */
export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
}))(MuiDialogContent);

/**
 * Define custom hook to save state of configuration.
 * This hook returns object with settings
 * for all input elements and dialog.
 */
const useSubjectConfigurationElements = (props: TSubjectConfigurationModalProps) => {
    /** Destruct props */
    const {
        dialogVisible,
        subjectThemes,
        subSubjectsNames,
        subSubjectsThemes,
        toggleSubjectConfigurationDialog,
    } = props;

    /** Responsible for themes or exams selection */
    const [testType, setTestType] = useState<ETestTypes>('' as ETestTypes);
    const handleChangeTestType = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setTestType(event.target.value as ETestTypes),
        []);

    /** Responsible for theme selection of specific sub-subject */
    const [subSubject, setSubSubject] = useState<string>(subSubjectsNames !== null ? subSubjectsNames[0] : '');
    const handleChageSubSubject = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSubSubject(event.target.value),
        []);

    /** Responsible for theme selection */
    const [theme, setTheme] = useState<string>(subjectThemes !== null ? subjectThemes[0] : '');
    const handleChangeTheme = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setTheme(event.target.value),
        []);

    /** Memoized value which returns list of sub-subjects */
    const subSubjects = useMemo(() => {
        if (subSubjectsNames === null || testType !== ETestTypes.THEMES) return null;

        return subSubjectsNames.map(subject => (
            <MenuItem key={subject} value={subject}>
                {subject}
            </MenuItem>
        ));
    }, [subSubjectsNames, testType]);

    /** Responsible for displaying of sub-subject selection */
    const displaySubSubjectSelection = useMemo(() =>
        subSubjectsNames !== null && testType === ETestTypes.THEMES,
    [testType, subSubjectsNames]);

    /** Memoized value which returns list of themes */
    const themes = useMemo(() => {
        /**
         * If subSubjectsThemes is not null and some subSubject is selected
         * and testType equals 'THEMES'
         * then this function will returns themes list for selected subSubject.
         */
        if (subSubjectsThemes !== null && subSubject !== '' && testType === ETestTypes.THEMES) {
            return subSubjectsThemes[subSubject].map(theme => (
                <MenuItem key={theme} value={theme}>
                    {theme}
                </MenuItem>
            )) || null;
        }

        /**
         * If subjectThemes is not null and subSubjectsThemes is null
         * and testType equals 'THEMES'
         * then this function will returns themes list for current subject.
         */
        if (subjectThemes !== null && subSubjectsThemes === null && testType === ETestTypes.THEMES) {
            return subjectThemes.map(theme => (
                <MenuItem key={theme} value={theme}>
                    {theme}
                </MenuItem>
            ));
        }

        return null;
    }, [subjectThemes, testType, subSubject, subSubjectsThemes]);

    /** Responsible for displaying of theme selection */
    const displayThemeSelection = useMemo(() =>
        subjectThemes !== null && testType === ETestTypes.THEMES,
    [testType, subjectThemes]);

    return {
        displayThemeSelection,
        displaySubSubjectSelection,
        subSubjects,
        themes,
        dialog: {
            open: dialogVisible,
            onClose: () => toggleSubjectConfigurationDialog(false),
        },
        selectTypeField: {
            value: testType,
            onChange: handleChangeTestType,
        },
        selectSubSubjectField: {
            value: subSubject,
            onChange: handleChageSubSubject,
        },
        selectThemeField: {
            value: theme,
            onChange: handleChangeTheme,
        },
    };
};

/** Create component */
const Component = (props: TSubjectConfigurationModalProps) => {
    /** Get elements from custom hook */
    const {
        dialog,
        themes,
        subSubjects,
        selectTypeField,
        selectThemeField,
        selectSubSubjectField,
        displayThemeSelection,
        displaySubSubjectSelection,
    } = useSubjectConfigurationElements(props);

    return (
        <Dialog
            {...dialog}
            aria-labelledby='subject-config-title'
            aria-describedby=''
        >
            <DialogTitle id='subject-config-title'>
                Налаштування тесту
            </DialogTitle>
            <DialogContent>
                <FormControl component='fieldset'>
                    <FormLabel component='legend'>Оберіть тип тесту</FormLabel>
                    <RadioGroup
                        aria-label='select-test-type'
                        name='select-test-type'
                        data-testid='select-test-type'
                        {...selectTypeField}
                    >
                        <FormControlLabel
                            value={ETestTypes.THEMES}
                            control={<Radio color='primary' />}
                            label={ETestTypes.THEMES}
                            labelPlacement='end'
                        />
                        <FormControlLabel
                            value={ETestTypes.EXAMS}
                            control={<Radio color='primary' />}
                            label={ETestTypes.EXAMS}
                            labelPlacement='end'
                        />
                    </RadioGroup>
                </FormControl>

                { displaySubSubjectSelection && (
                    <FormControl component='div'>
                        <FormLabel component='legend'>Оберіть предмет</FormLabel>
                        <TextField
                            id='standard-select-currency'
                            select={true}
                            {...selectSubSubjectField}
                            margin='none'
                            variant='outlined'
                            data-testid='select-sub-subject'
                        >
                            {subSubjects}
                        </TextField>
                    </FormControl>
                )}

                { displayThemeSelection && (
                    <FormControl component='div'>
                        <FormLabel component='legend'>Оберіть тему</FormLabel>
                        <TextField
                            id='standard-select-currency'
                            select={true}
                            {...selectThemeField}
                            margin='none'
                            variant='outlined'
                            data-testid='select-subject-theme'
                        >
                            {themes}
                        </TextField>
                    </FormControl>
                )}
            </DialogContent>
        </Dialog>
    );
};

/** Export component */
export default Component;
