/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Component which display main stats for current test suite
 * and has some actions.
 */

/** External imports */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import Wrapper from '../Wrapper';
import { TTestSuiteStatsProps } from './container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }));

const Component = ({}: TTestSuiteStatsProps) => {
    const classes = useStyles({});

    return (
        <Wrapper>
            
        </Wrapper>
    );
};

export default Component;
