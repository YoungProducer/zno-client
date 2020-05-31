/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 29 February 2020
 *
 * Create history.
 */

/** External imports */
import { createBrowserHistory } from 'history';

/** Create browser history */
const history = createBrowserHistory({
    basename: '/zno',
});

/** Export history */
export default history;
