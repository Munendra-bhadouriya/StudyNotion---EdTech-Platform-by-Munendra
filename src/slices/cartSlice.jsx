import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, value) {
            const course = value.payload
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                //if the course is already in the cart, then dont modify the cart
                toast.error("Course already in cart.");
                return;
            }

            //here => course not in cart then put in cart and update the values
            state.cart.push(course);
            state.total += parseInt(course.price);
            state.totalItems++;

            //update loacl storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Course added to the course");

        },
        removeFromCart(state, value) {
            const courseId = value.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index >= 0){
                //if the course is found in the cart the remove it
                state.totalItems--;
                state.total -= parseInt(state.cart[index].price);
                state.cart.splice(index, 1);
                
                //update loacl storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Course removed from the cart");
            }
        },
        resetCart(state, value) {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            //update loacl storage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        }
    },
});

export const { addToCart, resetCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;