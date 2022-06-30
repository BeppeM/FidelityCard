import { createAsyncThunk } from "@reduxjs/toolkit";
import { redeemItem as perform, getRedeemHistory as getHistory } from "../../services/redeemService";

export const redeemItem = createAsyncThunk(
    "redeem/perform",
    async (data, {dispatch}) => {
        console.log(data);
        return await perform(data.redeemLog, data.token)
                .then(res => {
                    if (res.status === 200) {
                        return data.redeemLog;
                    } else {
                        return res.json();
                    }
                })
    }
)

export const getRedeemHistory = createAsyncThunk(
    "redeem/getHistory",
    async (data, {dispatch}) => {
        return await getHistory(data.user, data.token)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return null;
                }
            });
    }
)