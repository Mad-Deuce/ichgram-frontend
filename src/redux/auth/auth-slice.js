import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "/src/shared/utils/redux";

import { registerUser, getCurrentUser, loginUser, logoutUser } from "./auth-thunks";

const initialState = {
    loading: false,
    error: null,
    token: null,
    tempToken: null,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, pending)
            .addCase(registerUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.token = payload.token;
                store.user = payload.user;
            })
            .addCase(registerUser.rejected, rejected)

            .addCase(getCurrentUser.pending, pending)
            .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.user = payload;
            })
            .addCase(getCurrentUser.rejected, (store) => {
                store.loading = false;
                store.token = null;
            })

            .addCase(loginUser.pending, pending)
            .addCase(loginUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.token = payload.token;
                store.user = payload.user;
            })
            .addCase(loginUser.rejected, rejected)

            .addCase(logoutUser.pending, pending)
            .addCase(logoutUser.fulfilled, (store) => {
                store.loading = false;
                store.token = null;
                store.user = null;
            })
            .addCase(logoutUser.rejected, rejected)
    }
});

export default authSlice.reducer;