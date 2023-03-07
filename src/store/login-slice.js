import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        username: 'gadi800',
        requestURL: 'http://localhost:8080/'
    },
    reducers: {
        changeLogin(state, action) {
            state.isLoggedIn = action.payload;
        },
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;