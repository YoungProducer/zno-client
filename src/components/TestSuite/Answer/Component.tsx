/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 */

/** External imports */
import React, { useState } from 'react';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { TAnswerProps } from './container';
import Single from './Single';
import Relations from './Relations';
import { TAnswerType } from 'api';

export const markUp = ['A', 'Б', 'В', 'Г', 'Д'];

interface IAnswerProps {
    type: TAnswerType;
    taskIndex: number;
}

const Component = ({ type, taskIndex }: IAnswerProps) => {
    return (
        <>
            { type === 'SINGLE' && <Single taskIndex={taskIndex}/>}
            { type === 'RELATIONS' && <Relations taskIndex={taskIndex}/>}
        </>
    );
};

export default Component;
