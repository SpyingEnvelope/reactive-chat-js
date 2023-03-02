import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        data: {},
        show: false
    },
    reducers: {
        setModalData(state, action) {
            state.data = action.payload;
        },
        showModal(state, action) {
            state.show = true
        },
        hideModal (state, action) {
            state.show = false
        }
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice;