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
    Image,
    Label,
    Rect,
} from 'react-konva';
import useImage from 'use-image';

import 'konva/lib/shapes/Circle';
import 'konva/lib/shapes/Image';
import 'konva/lib/shapes/Label';
import 'konva/lib/shapes/Rect';

/** Application's imports */
import { getCirclesData, getIconsData, IIconData, ICircle } from './process';
import { TSubjectList } from 'store/slices';

import math from 'public/images/mathematics.svg';

const CustomCircle = ({
    x,
    y,
    radius,
    hidden,
    imageUrl,
    name,
}: {
    x: number;
    y: number;
    radius: number;
    hidden: boolean;
    imageUrl: string;
    name: string;
}) => {
    const imageHeight = 40;
    const imageWidth = 40;

    let [imageSource] = useImage(imageUrl);
    let circle: any;
    let image: any;

    useEffect(() => {
        circle.to({
            scaleX: hidden ? 0 : 1,
            scaleY: hidden ? 0 : 1,
            duration: (Math.random() * (0.4 - 0.2) + 0.2).toFixed(1),
        });
        image.to({
            scaleX: hidden ? 0 : 1,
            scaleY: hidden ? 0 : 1,
            duration: 0.2,
        });
    }, [hidden]);

    return (
        <>
            <Circle
                x={x}
                y={y}
                radius={radius}
                fill={'#fff'}
                ref={node => circle = node}
            />
            <Image
                image={imageSource}
                x={x}
                y={y}
                offsetX={imageWidth / 2}
                offsetY={imageHeight / 2}
                width={imageWidth}
                height={imageHeight}
                ref={node => image = node}
            />
        </>
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
                { icons.map(({ x, y, radius, hidden, name, image }, index) => (
                    <CustomCircle
                        key={index}
                        x={x}
                        y={y}
                        radius={radius}
                        hidden={hidden}
                        name={name}
                        imageUrl={image}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Component;
