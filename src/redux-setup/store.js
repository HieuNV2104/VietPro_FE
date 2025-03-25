import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import customerReducer from './reducers/customerReducer';
import userReducer from './reducers/userReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// persist config
const persistConfig = {
    key: 'vietpro_store',
    storage
};
const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        cartReducer,
        customerReducer,
        userReducer
    })
);

// store
export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
