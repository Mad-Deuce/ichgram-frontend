import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "/src/shared/utils/redux";

import { registerUser, getCurrentUser, loginUser, logoutUser, resetPassword, updatePassword, refreshTokens } from "./auth-thunks";

const initialState = {
    loading: false,
    error: null,
    message: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, pending)
            .addCase(registerUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.message = payload.message;
            })
            .addCase(registerUser.rejected, rejected)

            .addCase(loginUser.pending, pending)
            .addCase(loginUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.user = payload.user;
                store.message = payload.message;
            })
            .addCase(loginUser.rejected, rejected)


            .addCase(getCurrentUser.pending, pending)
            .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.user = payload.user;
                store.message = payload.message;
            })
            .addCase(getCurrentUser.rejected, (store, { payload }) => {
                // store.user = null;
                rejected(store, { payload })
            })

            .addCase(refreshTokens.pending, pending)
            .addCase(refreshTokens.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.error = null
                // store.user = payload.user;
                store.message = payload.message;
            })
            .addCase(refreshTokens.rejected, (store, { payload }) => {
                store.user = null;
                rejected(store, { payload })
            })


            .addCase(logoutUser.pending, pending)
            .addCase(logoutUser.fulfilled, (store) => {
                store.loading = false;
                store.user = null;
                store.message = null;
            })
            .addCase(logoutUser.rejected, rejected)

            .addCase(resetPassword.pending, pending)
            .addCase(resetPassword.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.user = null;
                store.message = payload.message;
            })
            .addCase(resetPassword.rejected, rejected)

            .addCase(updatePassword.pending, pending)
            .addCase(updatePassword.fulfilled, (store, { payload }) => {
                store.loading = false;
                store.user = payload.user;
                store.message = payload.message;
            })
            .addCase(updatePassword.rejected, rejected)
    }
});

export default authSlice.reducer;