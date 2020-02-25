// Created by Olexandr Bezrukov
// 21 January 2020

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e57373',
            contrastText: '#333',
        },
        secondary: {
            main: '#4CAF50',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'ProductSans, Arial',
    },
});

export default theme;
