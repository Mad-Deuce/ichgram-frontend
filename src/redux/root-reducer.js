import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import modalReducer from "./modal/modal-slice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    modal: modalReducer
});




export default rootReducer;