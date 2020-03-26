/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Component which displays hours, minutes and seconds if use select limitTime mode.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 365,
            '& span': {
                marginRight: theme.spacing(0.5),
                color: '#b19898',
                fontSize: '1.5375rem',
                '&:last-child': {
                    marginRight: 0,
                },
            },
        },
    }));

interface ITimerProps {
    hours: number;
}

const Component = ({ hours }: ITimerProps) => {
    const classes = useStyles({});

    const [currSeconds, setSeconds] = useState<number>(60);
    const [currMinutes, setMinutes] = useState<number>(60 - 1);
    const [currHours, setHours] = useState<number>(hours - 1);
    const [active, setActive] = useState<boolean>(true);

    const toggleActive = () => setActive(!active);

    useEffect(() => {
        let interval: NodeJS.Timeout = undefined;

        if (active) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (currHours === 0) {
            setActive(false);
        }

        if (currSeconds === 0) {
            setSeconds(60);
            setMinutes(minutes => minutes - 1);
        } else if (currMinutes === 0) {
            setMinutes(60);
            setHours(hours => hours - 1);
        } else if (hours === 0) setActive(false);

        return () => clearInterval(interval);
    }, [active, currSeconds, currMinutes, currHours]);

    return (
        <div className={classes.root}>
            <span>Час до закінчення тесту:</span>
            <span>{currHours}</span>
            <span>:</span>
            <span>{currMinutes}</span>
            <span>:</span>
            <span>{currSeconds}</span>
        </div>
    );
};

export default Component;
