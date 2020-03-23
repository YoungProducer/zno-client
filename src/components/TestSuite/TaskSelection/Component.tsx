/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 *
 * Component which allows to select which task user want to complete.
 */

/** External imports */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const tileWidth = 65;
const activeTileWidth = 93;
/** Distance between tiles */
const tilesSpacing = 16;

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
            transition: theme.transitions.create(['height', 'width', 'background'], {
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
            transition: theme.transitions.create(['height', 'width', 'background'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        tileHide: {
            visibility: 'hidden',
        },
    }));

interface ITileProps {
    taskIndex: number;
    active: boolean;
    callback: any;
    hide: boolean;
}

const Tile = ({ taskIndex, active, callback, hide }: ITileProps) => {
    const classes = useTileStyles({});

    return (
        <ButtonBase
            className={classNames(classes.tile, {
                [classes.tileActive]: active,
                [classes.tileHide]: hide,
            })}
            onClick={callback}
        >
            <p>Зав</p>
            <p>{taskIndex}</p>
        </ButtonBase>
    );
};

const useComponentStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            position: 'relative',
            height: 116,
            width: '100%',
            cursor: 'pointer',
        },
        innerContainer: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            height: '100%',
        },
    }));

const useCarouselFields = (tilesAmount: number) => {
    const [offsetX, setOffestX] = useState<number>(0);
    const [mouseDown, toggleMouseDown] = useState<boolean>(false);

    const rootContainerRef = React.createRef<HTMLDivElement>();

    const [buttonsAmount, setButtonsAmount] = useState<number>(0);

    const minOffset = 0;
    const maxOffset = tilesAmount * (tileWidth + tilesSpacing) - tilesSpacing + (activeTileWidth - tileWidth);

    const handleOnMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (mouseDown) {
            const mouseOffsetX = event.movementX / 2;
            const newOffsetX = offsetX + mouseOffsetX;

            console.log(newOffsetX, -maxOffset);

            if (newOffsetX > 0) {
                setOffestX(0);
            } else if (newOffsetX < -maxOffset + rootContainerRef.current.clientWidth) {
                setOffestX(-maxOffset + rootContainerRef.current.clientWidth);
            } else {
                setOffestX(newOffsetX);
            }
        }
    };

    useEffect(() => {
        const containerWidth = rootContainerRef.current.clientWidth;

        const amount = ((containerWidth + tilesSpacing) / (tileWidth + tilesSpacing));

        setButtonsAmount(Math.floor(amount));
    }, [rootContainerRef]);

    const handleOnMouseDown = () => toggleMouseDown(true);

    const handleOnMouseUp = () => toggleMouseDown(false);

    const firstButtonIndex = useMemo(() => {
        const index = Math.floor(offsetX / (tileWidth + tilesSpacing)) * -1;
        return 0 > index ? 0 : index - 2;
    }, [offsetX]);

    const lastButtonIndex = useMemo(() => {
        const index = buttonsAmount + Math.floor(offsetX / (tileWidth + tilesSpacing)) * -1;
        return buttonsAmount > index ? buttonsAmount : index + 2;
    }, [buttonsAmount, offsetX]);

    return {
        handleOnMouseMove,
        handleOnMouseDown,
        handleOnMouseUp,
        offsetX,
        mouseDown,
        rootContainerRef,
        buttonsAmount,
        firstButtonIndex,
        lastButtonIndex,
    };
};

const Component = () => {
    const classes = useComponentStyles({});

    const [activeEl, setActiveEl] = React.useState(0);

    const {
        offsetX,
        mouseDown,
        handleOnMouseMove,
        handleOnMouseDown,
        handleOnMouseUp,
        rootContainerRef,
        firstButtonIndex,
        lastButtonIndex,
    } = useCarouselFields(40);

    return (
        <div
            className={classes.root}
            onMouseMove={handleOnMouseMove}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            ref={rootContainerRef}
        >
            <Box
                className={classes.innerContainer}
                left={offsetX}
            >
                {[...Array(40)].map((_, index) => (
                    <Tile
                        key={index}
                        taskIndex={index}
                        active={index === activeEl}
                        hide={!(index >= firstButtonIndex && index <= lastButtonIndex)}
                        callback={() => {
                            if (!mouseDown) {
                                setActiveEl(index);
                            }
                        }}
                    />
                ))}
            </Box>
        </div>
    );
};

export default Component;
