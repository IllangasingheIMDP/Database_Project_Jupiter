import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/alertSlice';
import userReducer from './features/userSlice';

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        user: userReducer,
    },
});

export default store;