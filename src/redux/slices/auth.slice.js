import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: localStorage.getItem('isLogin') || false,
        userId: localStorage.getItem('userId'),
        fullName: null,
        username: null,
        status: null,
        avatar: 'avt.png',
    },
    reducers: {
        saveUserInfo: (state, action) => {
            const { id, fullName, username, account_status } = action.payload;
            //add data to state
            state.userId = id;
            state.isLogin = true;
            state.fullName = fullName;
            state.username = username;
            state.status = account_status;
            //add data to local storage
            localStorage.setItem('userId', id);
            localStorage.setItem('isLogin', true);
        },
        updateUserInfo: (state, action) => {
            const payload = action.payload;
            for (const key in payload) {
                if (Object.hasOwnProperty.call(state, key)) {
                    state[key] = payload[key];
                }
            }
        },
        logout: (state) => {
            localStorage.clear();
            state.isLogin = false;
            state.userId = null;
            state.fullName = null;
            state.username = null;
            state.status = null;
        },
    },
});

export const { logout, saveUserInfo, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
