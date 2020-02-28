/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 Feburary 2020
 *
 * Create tests suites for api class.
 */

/** External imports */
import MockAdapter from 'axios-mock-adapter';

/** Application's imports */
import api from 'api';

describe('Api', () => {
    /** Create mock adapter for axios */
    const mockAxios = new MockAdapter(api.axiosInstance);

    afterEach(() => {
        /** Reset axios after each test to prevent unhandled errors */
        mockAxios.reset();
    });

    test('signup success', async () => {
        /** Mock '/auth/user/signup' url */
        mockAxios
            .onPost('/auth/user/signup')
            .reply(200);

        /** Get result of signup method */
        const result = await api.signup({
            email: 'foo',
            password: 'bar',
        });

        /** Assert that result has status 200 */
        expect(result.status).toBe(200);
    });

    test('signup success', async () => {
        /** Mock '/auth/user/signin' url */
        mockAxios
            .onPost('/auth/user/signin')
            .reply(200);

        /** Get result of signin method */
        const result = await api.signin({
            email: 'foo',
            password: 'bar',
        });

        /** Assert that result has status 200 */
        expect(result.status).toBe(200);
    });
});
