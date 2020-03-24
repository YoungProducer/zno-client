/**
 * Created by: Oleksandr Bezrukov
 * Creation datel: 24 March 2020
 *
 * Component which render task tiles with correct colors.
 */

/** External imports */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { yellow, red } from '@material-ui/core/colors';

/** Application's imports */
import { TTileProps } from './container';

export const tileWidth = 65;
export const activeTileWidth = 93;
/** Distance between tiles */
export const tilesSpacing = 16;

const useTileStyles = makeStyles((theme: Theme) =>
    createStyles({
        tile: {
            minWidth: tileWidth,
            width: tileWidth,
            height: 92,
            borderRadius: 16,
            background: '#edeff3',
            fontSize: '1.25rem',
            color: '#b19898',
            lineHeight: '40px',
            display: 'block',
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
            marginRight: tilesSpacing,
            '&:last-child': {
                marginRight: 0,
            },
        },
        tileActive: {
            height: 116,
            width: activeTileWidth,
            minWidth: activeTileWidth,
            background: '#fff',
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        tileHide: {
            visibility: 'hidden',
        },
        right: {
            background: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            transition: theme.transitions.create(['background', 'color', 'height', 'width'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        wrong: {
            background: red.A200,
            color: theme.palette.getContrastText(red.A200),
            transition: theme.transitions.create(['background', 'color', 'height', 'width'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        selected: {
            background: yellow[600],
            color: theme.palette.getContrastText(yellow[600]),
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
    }));

const Tile = ({
    taskIndex,
    active,
    callback,
    hide,
    selected,
    gived,
    right,
}: TTileProps) => {
    const classes = useTileStyles({});

    return (
        <ButtonBase
            className={classNames(classes.tile, {
                [classes.tileActive]: active,
                [classes.tileHide]: hide,
                [classes.selected]: selected && !gived,
                [classes.right]: gived && right,
                [classes.wrong]: gived && !right,
            })}
            onClick={callback}
        >
            <p>Зав</p>
            <p>{taskIndex + 1}</p>
        </ButtonBase>
    );
};

export default Tile;
