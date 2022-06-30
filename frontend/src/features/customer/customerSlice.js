import { createSlice } from "@reduxjs/toolkit";
import { createCustomer, getCustomerInfo, resetStatus, updateCustomerInfo } from "./customerThunk";

const initialState = {
    value: null,
    status: null,
    error: null
};

const customerSlice = createSlice({
    name: "customers",
    initialState, //TODO: set correct initial state, empty array just for testing
    extraReducers: 
        builder =>
            builder
                .addCase(createCustomer.pending, state => {
                    state.status = "pending";
                    return state;
                })
                .addCase(createCustomer.fulfilled, (state, action) => {
                    console.log("Customer created");
                    state.status = "created";
                    return state;
                })
                .addCase(createCustomer.rejected, (state, action) => {
                    state.status = "ERR_CREATE";
                    console.log(action.error);
                    return state;
                })
                .addCase(getCustomerInfo.pending, () => {
                    console.log("Getting customer data");
                })
                .addCase(getCustomerInfo.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = action.payload;
                    console.log("Customer info in memory");
                    console.log(action.payload);
                    return state;
                })
                .addCase(getCustomerInfo.rejected, state => {
                    state.status = "rejected";
                    return state;
                })
                .addCase(updateCustomerInfo.pending, () => {
                    console.log("Updating info...");
                })
                .addCase(updateCustomerInfo.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.value = action.payload;
                    return state;
                })
                .addCase(resetStatus, state => {
                    state.error = null;
                    state.value = null;
                    state.status = null;
                    return state;
                })
});

const reducer = customerSlice.reducer;
export default reducer;
export { createCustomer, getCustomerInfo, updateCustomerInfo }