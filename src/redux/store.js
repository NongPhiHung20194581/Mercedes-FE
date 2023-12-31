import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice"
import loadingReducer from "./slices/loading.slice"
import profileReducer from "./slices/profile.slice"
import bookingSlice from "./slices/booking.slice";

const rootReducer = {
    auth: authReducer,
    loading: loadingReducer,
    profile: profileReducer,
    booking: bookingSlice,
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;