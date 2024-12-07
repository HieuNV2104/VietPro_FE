import axios from 'axios';
import { BASE_API } from '../shared/constants/app';
import { store } from '../redux-setup/store';
import { updateAccessToken } from '../redux-setup/reducers/authReducer';
import { refreshToken } from './Api';

const Http = axios.create({
    baseURL: BASE_API,
    withCredentials: true
});

// interceptors request
Http.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const auth = state?.authReducer;
        const login = auth?.login;
        if (login.loggedIn) {
            const accessToken = login?.currentCustomer?.accessToken;
            config.headers['token'] = `Bearer ${accessToken}`;
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
        // console.log(response.data);

        if (response.data === 'Token expired') {
            if (response.config.url.indexOf('/customer/refreshtoken') >= 0) {
                return error;
            }
            const data = (await refreshToken()).data;
            console.log(data);
            const newAccessToken = data.accessToken;
            store.dispatch(updateAccessToken({ newAccessToken }));
            console.log(newAccessToken);
            response.config.headers['token'] = `Bearer ${newAccessToken}`;
            return Http(response.config);
        }
        return Promise.reject(error);
    }
);

export default Http;
