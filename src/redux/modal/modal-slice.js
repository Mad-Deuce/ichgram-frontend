import { createSlice } from "@reduxjs/toolkit";

const modalState = {
    hidden: true,
    childrenType: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState: modalState,
    reducers: {
        showModal: (store, { payload }) => {
            store.hidden = false;
            store.childrenType = payload
        },
        hideModal: (store) => {
            store.hidden = true;
        },
        toggleModal: (store) => {
            store.hidden = !store.hidden;
        },
    },
});

export const { showModal, hideModal, toggleModal } =
    modalSlice.actions;

export default modalSlice.reducer;