import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;