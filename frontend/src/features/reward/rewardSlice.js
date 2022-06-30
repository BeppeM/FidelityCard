import { createSlice } from "@reduxjs/toolkit";
import { addReward, deleteReward, getCatalogRewards, resetStatus, updateStock } from "./rewardThunk";

const initialState = {
    value: null,
    status: null,
    error:null
} 


const rewardSlice = createSlice({
    name: "rewards",
    initialState,
    extraReducers:
        builder => 
            builder 
                .addCase(getCatalogRewards.pending, state => {
                    state.status = "pending";
                    return state;
                })
                .addCase(getCatalogRewards.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = action.payload;
                    return state;
                })
                .addCase(resetStatus, state => {
                    state.value = null;
                    state.status = null;
                    state.error = null;
                    return state;
                })
                .addCase(addReward.pending, () => {
                    console.log("Creating new reward");
                })
                .addCase(addReward.fulfilled, (state, action) => {
                    if (action.payload.id !== null) {
                        state.status = "fulfilled";
                        state.value.push(action.payload);
                    } else {
                        state.status = "ERR_ADD_REWARD";
                    }
                    return state;
                })
                .addCase(updateStock.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = state.value.map(reward => {
                        if (reward.id === action.payload.reward) { 
                            reward.currentQuantity += parseInt(action.payload.stock);
                            reward.quantityOnRestock += parseInt(action.payload.stock);
                        }
                        return reward;
                    });
                    return state;
                })
                .addCase(deleteReward.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = state.value.filter(reward => reward.id !== action.payload);
                    return state;
                })
});

const reducer = rewardSlice.reducer;
export default reducer;
export {getCatalogRewards};