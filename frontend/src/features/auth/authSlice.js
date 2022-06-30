import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshToken, updatePassword, updateUsername } from "./authThunk";
import jwt_decode from "jwt-decode";


const initialState = {
    access_token: "",
    user: null,
    status: null,
    error: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers:
        builder => 
            builder
                .addCase(login.fulfilled, (state, action) => {
                    //console.log("Swapped credentials with JWTs");
                    state.access_token = action.payload.access;
                    //console.log("Access token stored in memory");
                    state.user = jwt_decode(action.payload.access);
                    //console.log(state.user);
                    localStorage.setItem("refresh_token", action.payload.refresh);
                    //console.log("Refresh token stored in permanent storage");
                    state.status = "AUTH";
                    return state;
                })
                .addCase(login.rejected, (state, action) => {
                    console.log(action.error);
                    state.status = "ERR_AUTH";
                    return state;
                })
                .addCase(login.pending,  state => {
                    state.status = "PENDING_AUTH";
                    return state;
                })
                .addCase(refreshToken.fulfilled, (state, action) =>  {
                    //console.log("Access token updated through refresh token");
                    //console.log(action.payload.access);
                    state.access_token = action.payload.access;
                    state.user = jwt_decode(action.payload.access);
                    state.status = "AUTH"
                    //console.log(state.access_token);
                    return state;
                })
                .addCase(refreshToken.pending, (state, action) => {
                    state.status = "refresh_pending";
                    return state;
                })
                .addCase(updatePassword.pending, () => {
                    console.log("Updating user data...");
                })
                .addCase(updatePassword.fulfilled, (state, action) => {
                    console.log("User now should log back in");
                    localStorage.removeItem("refresh_token");
                    state.access_token = "";
                    state.user = null;
                    state.status = "updated";
                })
                .addCase(logout, (state, action) => {
                    console.log("Logging out...");
                    localStorage.removeItem("refresh_token");
                    state.access_token = "";
                    state.error = null;
                    state.status = null;
                    state.user = null;
                    return state;
                })
    }
);

const reducer = authSlice.reducer;
export default reducer;
export { login, refreshToken, logout, updatePassword };
