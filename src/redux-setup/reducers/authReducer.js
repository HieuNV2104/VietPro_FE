import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        currentCustomer: null,
        loggedIn: false,
        error: false
    }
};

const authReducer = createSlice({
    name: 'authReducer',
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
        udpateSuccess: (state, action) => {
            state.login.currentCustomer = {
                ...state.login.currentCustomer,
                fullName:
                    action.payload.data.fullName || state.customerInfo.fullName,
                phone: action.payload.data.phone || state.customerInfo.phone,
                address:
                    action.payload.data.address || state.customerInfo.address
            };
        },
        updateAccessToken: (state, action) => {
            state.login.currentCustomer.accessToken =
                action.payload.newAccessToken;
        }
    }
});

export const { loginSuccess, logoutSuccess, udpateSuccess, updateAccessToken } =
    authReducer.actions;
export default authReducer.reducer;
