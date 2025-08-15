import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerUserApi, getCurrentUserApi, logoutUserApi, loginUserApi } from "../../shared/api/auth-api";

export const registerUser = createAsyncThunk(
    "auth/register",
    async(payload, {rejectWithValue})=> {
        try {
            const data = await registerUserApi(payload);
            return data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    "auth/current",
    async(_, {rejectWithValue, getState})=> {
        try {
            const {auth} = getState();
            const data = await getCurrentUserApi(auth.token);
            return data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    },
    {
        condition: (_, {getState})=> {
            const {auth} =getState();
            return Boolean(auth.token);
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async(payload, {rejectWithValue})=> {
        try {
            const data = await loginUserApi(payload);
            return data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async(_, {rejectWithValue})=> {
        try {
            const data = await logoutUserApi();
            return data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)