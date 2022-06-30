import { createSlice } from "@reduxjs/toolkit"
import { createCatalog, getManagerCatalogs, resetStatus } from "./catalogThunk"


const initialState = {
    value:null,
    status:null,
    error:null
}

const catalogSlice = createSlice({
    name:"catalog",
    initialState,
    extraReducers: 
        builder => 
            builder
                .addCase(getManagerCatalogs.pending, state => {
                    console.log("Getting selected manager catalogs");
                    state.status = "pending";
                })
                .addCase(getManagerCatalogs.fulfilled, (state, action) => {
                    state.value = action.payload;
                    state.status = "fulfilled";
                    return state;
                })
                .addCase(createCatalog.pending, state => {
                    state.status = "creating";
                    return state;
                })
                .addCase(createCatalog.fulfilled, (state, action) => {
                    console.log(action.payload);
                    if (action.payload === null) {
                        state.status = "ERR_CREATE_CAT";
                    } else {
                        state.status = "CREATE_CAT";
                        if (state.value === null) {
                            state.value = [action.payload];
                        } else {
                            if (state.value.length > 0) {
                                console.log("created and added to list");
                                state.value.push(action.payload);
                            } else {
                                state.value = [action.payload];   
                            }
                        }
                        
                    }
                    return state;
                })
                .addCase(resetStatus, (state, action) => {
                    state.value = null;
                    state.status = null;
                    return state;
                })
});

const reducer = catalogSlice.reducer;
export default reducer;
