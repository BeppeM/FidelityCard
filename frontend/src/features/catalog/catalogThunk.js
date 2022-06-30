import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { 
        getManagerCatalogs as getByManager,
        createCatalog as create,
    }from "../../services/catalogService";


export const getManagerCatalogs = createAsyncThunk(
    'catalogs/getAllByManager',
    async (data, {dispatch}) => {
        return await getByManager(data.manager, data.token).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
    }
) 


export const createCatalog = createAsyncThunk(
    'catalogs/create',
    async (data, {dispatch}) => {
        return await create(data.catalog, data.token).then(
            res => {
                if (res.status === 200) {
                    return data.catalog;
                } else {
                    return null;
                }
            }
        );
    }
)
export const resetStatus = createAction('catalogs/reset');