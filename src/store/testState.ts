/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create test state for redux-store for development.
 */

/** Application's imports */
import { RootState } from './slices';

export default {
    subjects: {
        loading: false,
        subjectsList: [
            'Математика',
            'Фізика',
            'Українська мова',
            'Хімія',
        ],
    },
} as RootState;
