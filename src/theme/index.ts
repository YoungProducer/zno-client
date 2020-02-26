// Created by Olexandr Bezrukov
// 21 January 2020

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[800],
            contrastText: '#fff',
        },
        secondary: {
            main: '#4CAF50',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'ProductSans-Light, Arial',
    },
});

export default theme;
