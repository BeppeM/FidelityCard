import { createSlice } from "@reduxjs/toolkit";
import { addPointsToCard, createCard, deleteCard, getCatalogCards, getCustomerCards, resetStatus } from "./cardThunk";


const initialState = {
    value: null,
    status: null,
    error: null
};

const cardSlice = createSlice({
    name:"card",
    initialState,
    extraReducers:
        builder =>
            builder
                .addCase(createCard.fulfilled, (state, action) => {
                    console.log(action.payload)
                    if (action.payload.id === null) {
                        state.status = "ERR_CARD_CREATE";
                    } else {
                        state.status = "CARD_CREATED";
                        if (state.value === null || state.value?.length === 0) {
                            state.value = [action.payload];
                        } else {
                            if (state.value.length > 0) {
                                state.value.push(action.payload);
                            }
                        }
                    }
                    return state;
                })
                .addCase(createCard.pending, state => {
                    console.log("creation...");
                    state.status = "pending";
                    return state;
                })
                .addCase(getCustomerCards.pending, (state, action) => {
                    state.status = "pending";
                    return state;
                })
                .addCase(getCustomerCards.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = action.payload;
                    return state;
                })
                .addCase(getCatalogCards.pending, (state, action) => {
                    state.status = "pending";
                    return state;
                })
                .addCase(getCatalogCards.fulfilled, (state, action) => {
                    state.status = "fulfilled";
                    state.value = action.payload;
                    return state;
                })
                .addCase(addPointsToCard.fulfilled, (state, action) => {
                    state.status = "fulfilled"
                    state.value = state.value.map(card => {
                        if (card.id === action.payload.id) {
                            card.earnedPoints += parseInt(action.payload.pts);
                            card.currentPoints += parseInt(action.payload.pts);
                        }
                        return card;
                    });
                    return state;
                })
                .addCase(deleteCard.fulfilled, (state, action) => {
                    state.value = state.value.filter(card => {
                        return card.id !== action.payload
                    });
                    state.status = "DELETE";
                    return state;
                })
                .addCase(resetStatus, (state, action) => {
                    state.status = null;
                    state.value = null;
                    state.error = null;
                    return state;
                })
});

const reducer = cardSlice.reducer;
export default reducer;
export {createCard};