import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        currentCustomer: null,
        loggedIn: false,
        error: false
    }
};

const customerReducer = createSlice({
    name: 'customerReducer',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.login.currentCustomer = action.payload;
            state.login.loggedIn = true;
        },
        logoutSuccess: (state, action) => {
            state.login.currentCustomer = null;
            state.login.loggedIn = false;
        },
        updateSuccess: (state, action) => {
            state.login.currentCustomer = {
                ...state.login.currentCustomer,
                fullName: action.payload.data.fullName,
                phone: action.payload.data.phone,
                address: action.payload.data.address
            };
        },
        updateAccessToken: (state, action) => {
            state.login.currentCustomer.accessToken =
                action.payload.newAccessToken;
        }
    }
});

export const { loginSuccess, logoutSuccess, updateSuccess, updateAccessToken } =
    customerReducer.actions;
export default customerReducer.reducer;
