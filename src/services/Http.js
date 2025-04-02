import axios from 'axios';
import { BASE_API } from '../shared/constants/app';
import { store } from '../redux-setup/store';
import {
    updateAccessToken,
    logoutSuccess
} from '../redux-setup/reducers/customerReducer';
import {
    updateAccessTokenUser,
    logoutUserSuccess
} from '../redux-setup/reducers/userReducer';
import { refreshTokenCustomer, refreshTokenUser } from './Api';

const Http = axios.create({
    baseURL: BASE_API,
    withCredentials: true
});

// interceptors request
Http.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        if (config.url.includes('/admin/')) {
            const auth = state?.userReducer;
            const login = auth?.login;
            if (login.loggedIn) {
                const accessToken = login?.currentUser?.accessToken;
                config.headers['authorization'] = `Bearer ${accessToken}`;
            }
        } else {
            const auth = state?.customerReducer;
            const login = auth?.login;
            if (login.loggedIn) {
                const accessToken = login?.currentCustomer?.accessToken;
                config.headers['authorization'] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

// interceptors response
Http.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const response = error.response;

        if (response.data && response.data === 'Token expired') {
            if (response.config.url.includes('/refreshToken')) {
                return error;
            }
            try {
                if (response.config.url.includes('/admin/')) {
                    const newAccessToken = (await refreshTokenUser()).data
                        .accessToken;
                    store.dispatch(updateAccessTokenUser({ newAccessToken }));
                    response.config.headers[
                        'authorization'
                    ] = `Bearer ${newAccessToken}`;
                } else {
                    const newAccessToken = (await refreshTokenCustomer()).data
                        .accessToken;
                    store.dispatch(updateAccessToken({ newAccessToken }));
                    response.config.headers[
                        'authorization'
                    ] = `Bearer ${newAccessToken}`;
                }
                return Http(response.config);
            } catch (error) {
                if (response.config.url.includes('/admin/')) {
                    store.dispatch(logoutUserSuccess());
                } else {
                    store.dispatch(logoutSuccess());
                }
            }
        }
        return Promise.reject(error);
    }
);

export default Http;
