# Zno client

It'a frontend part of application which allows stutends to prepare to exams or train
on different subjects, such as Math, etc.

*Tech stack:*
 - Typescript;
 - Webpack;
 - React;
 - stm - @reduxjs/toolkit;
 - React-Router-Dom
 - Testing:
    - Jest;
    - Enzyme(for snapshots and components testing).

*env setup*
There are just 4 env variables:
 - REACT_USE_TEST_STATE - if true use mocked state as default when redux create store;
 - PORT - port of application;
 - API_ENDPOINT - endpoint of backend.
 - ANALYZE_BUNDLE - if true open in new tab bundle analyzer to check size of different packages and total size of bundle.

*Instructions*
Before starting the app you should install the packages via ```yarn``` or ```npm``` i(ci). For this project I used ```yarn```.
Then you can run the app via ```yarn start``` or test it ```yarn test```.
Finally you can launch ```yarn build``` to get builded app.

