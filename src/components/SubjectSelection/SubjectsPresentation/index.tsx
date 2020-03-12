/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 March 2020
 *
 * Create component which display subjects.
 */

/** External imports */
import React, { useEffect } from 'react';
import {
    Stage,
    Layer,
    Circle,
} from 'react-konva';

import 'konva/lib/shapes/Circle';

/** Application's imports */
import { getCirclesData, getIconsData } from './process';

const CustomCircle = ({
    x,
    y,
    radius,
    scale = true,
}: {
    x: number;
    y: number;
    radius: number;
    scale: boolean;
}) => {
    let circle: any;

    useEffect(() => {
        circle.to({
            scaleX: scale ? 1.5 : 1,
            scaleY: scale ? 1.5 : 1,
            duration: 0.2,
        });
    }, [scale]);

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

const Component = () => {
    const circles = getCirclesData(8);

    const icons = getIconsData(circles);

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
                { icons.map(({ x, y, radius }, index) => (
                    <CustomCircle
                        key={index}
                        x={x}
                        y={y}
                        radius={radius}
                        scale={false}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Component;
