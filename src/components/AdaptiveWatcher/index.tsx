/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 April 2020
 *
 * Component which check width of screen
 * and if it matches to width of mobile devices
 * should redirect to mobile version of this site.
 */

/** External imports */
import { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/** Application's imports */

const Component = (): null => {
    const mathces = useMediaQuery('(orientation: portrait) and (max-width: 800px)');

    const mode = process.env.NODE_ENV || 'production';
    const url = mode === 'production'
        ? `${process.env.MOBILE_ENDPOINT}`
        : 'http://localhost:8081';

    useEffect(() => {
        if (mathces) {
            window.location.assign(url);
        }
    }, [mathces]);

    return null;
};

export default Component;
