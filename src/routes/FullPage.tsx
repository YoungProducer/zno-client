/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which create wrapper around child components
 * and have max width = 100 vh.
 */

/** External imports */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import Logo from 'img/logo';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxHeight: '100vh',
        height: '100vh',
        background: '#f4f6f9',
        padding: theme.spacing(6),
    },
    container: {
        display: 'flex',
    },
    logo: {
        paddingBottom: theme.spacing(1),
    },
}));

interface IFullPageProps {
    children: React.ReactNode;
}

const Component = ({ children }: IFullPageProps) => {
    const clasess = useStyles({});

    return (
        <div className={clasess.root}>
            <div className={clasess.logo}><Logo /></div>
            <div className={clasess.container}>
                {children}
            </div>
        </div>);
};

export default Component;
