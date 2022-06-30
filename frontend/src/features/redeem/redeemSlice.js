import { createSlice } from "@reduxjs/toolkit";
import { getRedeemHistory, redeemItem } from "./redeemThunk";

const initialState = {
    value: null,
    status: null,
    error: null
};


const redeemSlice = createSlice({
    name:"redeem",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(redeemItem.pending, state => {
                state.status = "pending"
                return state;
            })
            .addCase(redeemItem.fulfilled, (state, action) => {
                state.status = "REDEEM";
                return state;
            })
            .addCase(redeemItem.rejected, state => {
                state.status = "ERR_REDEEM";
                return state;
            })
            .addCase(getRedeemHistory.pending, state => {
                state.status = "pending";
                return state;
            })
            .addCase(getRedeemHistory.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.value = action.payload;
                return state;
            })
    }
});


const reducer = redeemSlice.reducer;
export default reducer;
