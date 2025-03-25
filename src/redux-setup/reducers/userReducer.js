import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        currentUser: null,
        loggedIn: false,
        error: false
    }
};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginUserSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.loggedIn = true;
        },
        logoutUserSuccess: (state, action) => {
            state.login.currentUser = null;
            state.login.loggedIn = false;
        },
        updateUserSuccess: (state, action) => {
            state.login.currentUser = {
                ...state.login.currentUser,
                full_name:
                    action.payload.full_name ||
                    state.login.currentUser.full_name,
                email: action.payload.email || state.login.currentUser.email,
                role: action.payload.role || state.login.currentUser.role
            };
        },
        updateAccessTokenUser: (state, action) => {
            state.login.currentUser.accessToken = action.payload.newAccessToken;
        }
    }
});

export const {
    loginUserSuccess,
    logoutUserSuccess,
    updateUserSuccess,
    updateAccessTokenUser
} = userReducer.actions;
export default userReducer.reducer;
