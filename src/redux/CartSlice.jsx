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
            return state.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementQuantity: (state, action) => {
            return state.map(item => {
                if (item.quantity > 1 && item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            });
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
