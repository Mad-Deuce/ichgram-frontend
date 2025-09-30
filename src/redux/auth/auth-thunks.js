import { createAsyncThunk } from "@reduxjs/toolkit";

import { signupUserApi, getCurrentUserApi, logoutUserApi, loginUserApi, resetPasswordApi, updatePasswordApi, refreshTokensApi } from "/src/shared/api/auth-api";

export const registerUser = createAsyncThunk(
    "auth/signup",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await signupUserApi(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await loginUserApi(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await resetPasswordApi(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)


export const updatePassword = createAsyncThunk(
    "auth/updatePassword",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await updatePasswordApi(payload);
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)




export const getCurrentUser = createAsyncThunk(
    "auth/current",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getCurrentUserApi();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    },
    {
        // condition: (_, { getState }) => {
        //     const { auth } = getState();
        //     console.log(auth);
            
        //     return Boolean(auth.user);
        // }
    }
)

export const refreshTokens = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const data = await refreshTokensApi();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    },
    {
        // condition: (_, { getState }) => {
        //     const { auth } = getState();
        //     console.log(auth);
            
        //     return Boolean(auth.user);
        // }
    }
)



export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const data = await logoutUserApi();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

