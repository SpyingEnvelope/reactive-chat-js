import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        username: 'gadi800'
    },
    reducers: {
        changeLogin(state, action) {
            state.isLoggedIn = action.payload;
        },
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;