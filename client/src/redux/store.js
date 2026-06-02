import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"

// combine reducer -> combine all reducer functions into a single reducer function
const rootReducer=combineReducers({
    user:userReducer
})

// console.log("storage: ",storage );


const persistConfig={
    key:'root',
    version:1,
    storage:storage.default,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck:false }),
});

export const persistor = persistStore(store)
