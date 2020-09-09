/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 March 2020
 *
 * Create component which display subjects.
 */

/** External imports */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

/** Application's imports */
import { getCirclesData, getIconsData, IIconData, ICircle } from './process';
import { TSubjectList } from 'store/slices';
import styles from './styles.module.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
    tooltip: {
        fontSize: '1.0rem',
        backgroundColor: '#343434',
        right: 100,
    },
    hint: {
        background: '#343434',
        transform: 'translateX(50%)',
        borderRadius: 4,
        padding: '0 8px',
        color: '#fff',
    },
}));

interface SubjectCircleProps {
    id: string;
    x: number;
    y: number;
    hidden: boolean;
    image: string;
    name: string;
}

const SubjectCircle = ({
    hidden,
    id,
    image,
    x,
    y,
    name,
}: SubjectCircleProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const classes = useStyles();

    useEffect(() => {
        if (ref.current) {
            const time = Math.random() * (2 - 0) + 0;
            ref.current.style.setProperty('--animation-time', `${-time}s`);
        }
    }, [ref.current]);

    return (
        <Link
            to={`subject-configuration/${id}`}
            style={{
                top: y - 25,
                left: x - 25,
            }}
            className={styles.subjectCircleLink}
            onClick={(e) => {
                // hard code
                if (name !== 'Математика') {
                    e.preventDefault();
                }
            }}
        >
            <div
                className={
                    classNames(styles.subjectCircle, {
                        [styles.subjectCircleHidden]: hidden,
                        [styles.subjectCircleAnimate]: name === 'Математика',
                        [styles.subjectCircleDisabled]: name !== 'Математика',
                    })
                }
                ref={ref}
            >
                <img src={image} alt={name}/>
            </div>
            <div className={classes.hint}>{name}</div>
        </Link>
    );
};

export type TSubjectPresentationProps = {
    subjectsList: TSubjectList;
    searchValue: string;
};

export interface ISmartIcon extends IIconData {
    id: string;
    name: string;
    image: string;
    hidden: boolean;
}

const Component = ({
    subjectsList,
    searchValue,
}: TSubjectPresentationProps) => {
    const [circles, setCircle] = useState<ICircle[]>([]);
    const [icons, setIcons] = useState<ISmartIcon[]>(() => {
        const circlesData = getCirclesData(subjectsList.length);
        setCircle(circlesData);

        const iconsData = getIconsData(circlesData);

        return iconsData.map((icon, index) => ({
            ...icon,
            ...subjectsList[index],
            hidden: false,
        }));
    });

    const change = useCallback(() => {
        setIcons(icons.map((icon) => {
            const match =
                searchValue === ''
                    ? false
                    : icon.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) === -1;

            return {
                ...icon,
                hidden: match,
            };
        }));
    }, [icons, searchValue]);

    useEffect(() => {
        setIcons(() => {
            const circlesData = getCirclesData(subjectsList.length);
            setCircle(circlesData);

            const iconsData = getIconsData(circlesData);

            return iconsData.map((icon, index) => ({
                ...icon,
                ...subjectsList[index],
                hidden: false,
            }));
        });
    }, [subjectsList]);

    useEffect(() => {
        change();
    }, [searchValue]);

    return (
        <div className={styles.root}>
            <svg
                width={650}
                height={650}
                className={styles.svg}
            >
                { circles.map(({ x, y, radius }, index) => (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={radius}
                        stroke='#7857cf'
                        strokeWidth="3"
                        fill='none'
                    />
                ))}
            </svg>
            { icons.map((subject, index) => (
                <SubjectCircle key={index }{...subject} />
            ))}
        </div>
    );
};

export default Component;
