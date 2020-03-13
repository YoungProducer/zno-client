/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 March 2020
 *
 * Create component which display subjects.
 */

/** External imports */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Stage,
    Layer,
    Circle,
} from 'react-konva';

import 'konva/lib/shapes/Circle';

/** Application's imports */
import { getCirclesData, getIconsData, IIconData, ICircle } from './process';
import { TSubjectList } from 'store/slices';

const CustomCircle = ({
    x,
    y,
    radius,
    hidden,
}: {
    x: number;
    y: number;
    radius: number;
    hidden: boolean;
}) => {
    let circle: any;

    useEffect(() => {
        circle.to({
            scaleX: hidden ? 0 : 1,
            scaleY: hidden ? 0 : 1,
            duration: 0.2,
        });
    }, [hidden]);

    return (
        <Circle
            x={x}
            y={y}
            radius={radius}
            fill={'#fff'}
            ref={node => circle = node}
        />
    );
};

export type TSubjectPresentationProps = {
    subjectsList: TSubjectList;
    searchValue: string;
};

export interface ISmartIcon extends IIconData {
    id: string;
    name: string;
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
        change();
    }, [searchValue]);

    return (
        <Stage width={650} height={650}>
            <Layer>
                { circles.map(({ x, y, radius }, index) => (
                    <Circle
                        key={index}
                        x={x}
                        y={y}
                        radius={radius}
                        stroke={'#7857cf'}
                        strokeWidth={3}
                    />
                ))}
            </Layer>
            <Layer>
                { icons.map(({ x, y, radius, hidden }, index) => (
                    <CustomCircle
                        key={index}
                        x={x}
                        y={y}
                        radius={radius}
                        hidden={hidden}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Component;
