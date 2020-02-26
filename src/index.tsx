/**
 * Create by: Oleksandr Bezrukov
 * Creation date: 25 February 2020
 *
 * Render application via ReactDOM.
 */

// External imports
import React from 'react';
import ReactDOM from 'react-dom';

// Application's imports
import App from './App';
import 'public/styles/index.css';

// Get root div
const root = document.getElementById('root');

// Render application into root div
ReactDOM.render(
    <App />,
    root,
);
