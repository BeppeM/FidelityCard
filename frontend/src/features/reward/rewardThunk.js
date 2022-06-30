import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
        getCatalogRewards as getByCatalog,
        addReward as create,
        updateStock as update,
        deleteReward as remove
    } from '../../services/catalogService';


export const getCatalogRewards = createAsyncThunk(
    "rewards/getByCatalog",
    async (data, {dispatch}) => {
        return await getByCatalog(data.catalog, data.manager, data.token)
                        .then(res => {
                            if (res.status === 200) {
                                return res.json();
                            }
                        });
    }
)


export const addReward = createAsyncThunk(
    "rewards/add",
    async (data, {dispatch}) => {
        return await create(data.reward, data.token)
            .then(res => res.json());
    }
)

export const updateStock = createAsyncThunk(
    'rewards/updateStock',
    async (data, {dispatch}) => {
        return await update(data.stock, data.reward, data.token)
            .then(res => {
                if (res.status === 200) {
                    return data;
                }
            });
    }
)

export const deleteReward = createAsyncThunk(
    'rewards/delete',
    async (data, {dispatch}) => {
        return await remove(data.id, data.token)
                .then(res => {
                    if (res.status === 200) {
                        return data.id;
                    }
                })
    }
)

export const resetStatus = createAction("rewards/reset");