export const pending = (store)=> {
    store.loading = true;
    store.error = null;
    store.message = null;
}

export const rejected = (store, {payload})=> {
    store.loading = false;
    store.error = payload;
    store.message = null;
}