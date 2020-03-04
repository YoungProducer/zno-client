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
    auth: {
        signIn: {
            user: {
                email: 'foo@gmail.com',
            },
        },
    },
    subjectConfiguration: {
        loading: false,
        dialogVisible: true,
        subjectConfig: {
            name: 'Математика',
            subSubjects: [{
                name: 'Алгбера',
                themes: ['1', '2'],
            }, {
                name: 'Геометрія',
                themes: ['1', '2'],
            }],
        },
    },
} as RootState;
