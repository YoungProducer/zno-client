/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 3 March 2020
 *
 * Create test suites for SubjectSelection component.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component from '../Component';
import { TSubjectSelectionProps } from '../container';

describe('SubjectSelection component', () => {
    /** Create mock for function */
    const fetchSubjectsNames = jest.fn();

    /** Define required props */
    const requiredProps: TSubjectSelectionProps = {
        fetchSubjectsNames,
        classes: {
            root: 'root',
        },
        loading: false,
        subjectsList: ['foo'],
    };

    afterEach(() => {
        (requiredProps.fetchSubjectsNames as jest.Mock).mockReset();
    });

    test('Is match snapshot', () => {
        /** Render component in shallow via enzyme */
        const tree = shallow(<Component {...requiredProps}/>);

        /** Assert component matches to snapshot */
        expect(tree).toMatchSnapshot();
    });
});
