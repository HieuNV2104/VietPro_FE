import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: []
};

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let isExists = false;
            state.cartItems.map((item) => {
                if (item._id === action.payload._id) {
                    item.qty += Number(action.payload.qty);
                    isExists = true;
                }
                return item;
            });
            isExists || state.cartItems.push(action.payload);
        },
        updateCart: (state, action) => {
            state.cartItems.map((item) => {
                if (item._id === action.payload._id) {
                    if (action.payload.qty < 1) {
                        action.payload.qty = 1;
                    }
                    item.qty = Number(action.payload.qty);
                }
                return item;
            });
        },
        deleteItemCart: (state, action) => {
            const newItems = state.cartItems.filter((item) => {
                return item._id !== action.payload._id;
            });
            state.cartItems = newItems;
        }
    }
});

export const { addToCart, updateCart, deleteItemCart } = cartReducer.actions;
export default cartReducer.reducer;
