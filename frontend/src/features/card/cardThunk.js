import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { 
        createCard as create, 
        getCustomerCards as getByCustomer, 
        getCatalogCards as getByCatalog,
        addPointsToCard as addPts,
        deleteCard as removeCard
    } from "../../services/cardService";


export const createCard = createAsyncThunk(
    "card/create",
    async (data, {dispatch}) => {
        return await create(data.card, data.token)
            .then(res => res.json());
    }
)

export const getCustomerCards = createAsyncThunk(
    "card/getByCustomer",
    async (data, {dispatch}) => {
        return await getByCustomer(data.customer, data.token)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                });
    }
)

export const getCatalogCards = createAsyncThunk(
    "card/getByCatalog",
    async (data, {dispatch}) => {
        return await getByCatalog(data.manager, data.catalog, data.token)
                        .then(res => {
                            if (res.status === 200) {
                                return res.json()
                            }
                        });
    }
)

export const addPointsToCard = createAsyncThunk(
    "card/addPts",
    async (data, {dispatch}) => {
        return await addPts(data.id, data.pts, data.token)
            .then(res => {
                if (res.status === 200) {
                    return data;
                }
            });
    }
)

export const deleteCard = createAsyncThunk(
    "card/delete",
    async (data, {dispatch}) => {
        return await removeCard(data.id, data.token)
            .then(res => {
                if (res.status === 200) {
                    return data.id;
                } else {
                    return res.json();
                }
            });
    }
)


export const resetStatus = createAction("card/reset");