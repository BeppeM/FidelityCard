import { createSlice } from "@reduxjs/toolkit";
import { createManager, getManagerInfo, getManagers, resetStatus, updateManagerInfo } from "./managerThunk";

const initialState = {
    value: null,
    status: null,
    error: null
}

const managerSlice = createSlice({
    name:'managers',
    initialState, //TODO: set correct initial state, empty array just for testing
    extraReducers: 
        builder => {
            builder
                .addCase(getManagers.pending, (state, action) => {
                    state.status = "pending";
                    return state;
                })
                .addCase(getManagers.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.value = action.payload;
                    state.status = "fulfilled";
                    return state;
                })
                .addCase(createManager.pending, state => {
                    state.status = "pending";
                    return state;
                })
                .addCase(createManager.fulfilled, (state, action) => {
                    console.log("Manager created in testing");
                    state.status = "created";
                    return state;
                })
                .addCase(createManager.rejected, (state) => {
                    state.status = "ERR_CREATE";
                    return state;
                })
                .addCase(getManagerInfo.pending, (state, action) => {
                    state.status = "pending";
                    return state;
                })
                .addCase(getManagerInfo.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = action.payload;
                    return state;
                })
                .addCase(updateManagerInfo.pending, () => {
                    console.log("Updating")
                })
                .addCase(updateManagerInfo.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.value = action.payload;
                    return state;
                })
                .addCase(resetStatus, state => {
                    state.status = null;
                    state.error = null;
                    state.value = null;
                    return state;
                })
        }
});

const reducer = managerSlice.reducer;
export default reducer;
export { getManagers, createManager };
