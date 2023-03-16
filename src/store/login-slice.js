import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        username: '',
        requestURL: 'http://localhost:8080/',
    },
    reducers: {
        changeLogin(state, action) {
            state.isLoggedIn = action.payload;
        },
        changeUser(state, action) {
            state.username = action.payload;
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;