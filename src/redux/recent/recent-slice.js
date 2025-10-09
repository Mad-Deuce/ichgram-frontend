import { createSlice } from "@reduxjs/toolkit";

const recentState = {
    users: [],
};

const recentSlice = createSlice({
    name: "recent",
    initialState: recentState,
    reducers: {
        addUser: (store, { payload }) => {
            if (store.users.some(item => item.id === payload.id)) return
            store.users.push(payload);
        },
    },
});

export const { addUser } = recentSlice.actions;

export default recentSlice.reducer;