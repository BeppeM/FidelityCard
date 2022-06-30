import { createAction, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { register } from "../../services/authService";
import { createCustomer as create, getCustomerInfo as get, updateCustomerInfo as update } from "../../services/customerService";
import jwt_decode from "jwt-decode";

/*export const getCustomers = createAsyncThunk(
    'customers/getAll',
    async (data = null, { dispatch }) => {
        const customers = await getAll();
        return customers;
    }
)*/

export const createCustomer = createAsyncThunk(
    'customers/registration',
    async (customer, {dispatch}) => {
        //console.log(customer);
        const user = {
            username: customer.username,
            password: customer.password,
            userRole: "CUSTOMER"
        }
        delete customer.password
        console.log("AUTH DATA:");
        console.log(user);
        console.log("CUSTOMER DATA:");
        console.log(customer);
        const res = await create(customer).then(res => {
            if (res.status === 400) {
                return res.json();
            } else {
                return register(user);
            }
        });
        return res;
    }
);

export const getCustomerInfo = createAsyncThunk(
    'customers/getInfo',
    async (token, {dispatch}) => {
        const decoded = jwt_decode(token);
        return await get(decoded.sub, token)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                });
    }
)

export const updateCustomerInfo = createAsyncThunk(
    'customers/updateInfo',
    async (data, {dispatch} ) => {
        await update(data.customer, data.token)
        return data.customer;
    }
)


export const resetStatus = createAction("customers/reset");