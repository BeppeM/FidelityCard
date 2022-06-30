import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authenitcate, refresh, updatePassword as updatePw, updateUsername as updateUn } from "../../services/authService";

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {dispatch}) => {
        console.log(credentials);
        console.log("Attempting authentication");
        return await authenitcate(credentials).then(res => {
            console.log(res.status);
            if (res.status === 403) {
                console.log("Bad credentials");
            } else {
                console.log("Correct credentials");
            }     
            return res.json();
        });
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refresh',
    async (access, {dispatch}) => {
        //console.log("Waiting for new access token");
        return await refresh();
    }
)

export const updatePassword = createAsyncThunk(
    'auth/update/password',
    async (data, {dispatch}) => {
        return await updatePw(data.user, data.token);
    }
)

// since there's no reason to logout from server (stateless), let's use creatAction()

export const logout = createAction('auth/logout')