/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Create tests suites for SubjectTile component.
 */

/** External imports */
import React from 'react';
import { shallow } from 'enzyme';

/** Application's imports */
import Component, { ISubjectProps } from '../SubjectTile';

describe('SubjectTile component', () => {
    /** Define required props */
    const requiredProps: ISubjectProps = {
        subject: 'foo',
    };

    test('Is match snapshot', () => {
        /** Render via enzyme */
        const root = shallow(<Component {...requiredProps} />);

        /** Assert component matches snapshot */
        expect(root).toMatchSnapshot();
    });
});
