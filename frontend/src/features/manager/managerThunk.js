import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../services/authService";
import { getManagers as getAll,
         createManager as create,
         getManagerInfo as get, 
         updateManagerInfo as update, 
        } from "../../services/managerService";


export const getManagers = createAsyncThunk(
    'managers/getAll',
    async (token, {dispatch}) => {
        return await getAll(token).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
    }
)

export const createManager = createAsyncThunk(
    'managers/registration',
    async (manager, {dispatch}) => {
        const user = {
            username: manager.username,
            password: manager.password,
            userRole: "MANAGER"
        };
        delete manager.password;
        console.log("AUTH DATA:");
        console.log(user);
        console.log("MANAGER DATA:");
        console.log(manager);
        const res = await create(manager).then(res => {
            if (res.status === 400) {
                return res.json();
            } else {
                return register(user);
            }
        });
        return res;
    }
)

export const getManagerInfo = createAsyncThunk(
    'managers/getManager',
    async (data, {dispatch}) => {
        return await get(data.manager, data.token).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
    }
)

export const updateManagerInfo = createAsyncThunk(
    'managers/updateInfo',
    async (data, {dispatch}) => {
        await update(data.manager, data.token);
        return data.manager;
    }
)

export const resetStatus = createAction("managers/reset");