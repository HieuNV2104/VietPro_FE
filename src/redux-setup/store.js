import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// persist config
// cart
const persistConfig = {
    key: 'vietpro',
    storage
};
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
// auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// store
export const store = configureStore({
    reducer: {
        cartReducer: persistedCartReducer,
        authReducer: persistedAuthReducer
    }
});

export const persistor = persistStore(store);
