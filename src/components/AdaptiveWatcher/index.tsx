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

    useEffect(() => {
        if (mathces) {
            window.location.assign('http://localhost:8081');
        }
    }, [mathces]);

    return null;
};

export default Component;
