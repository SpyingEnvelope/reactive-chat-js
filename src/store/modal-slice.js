import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        data: {},
        show: false,
        create: false
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
        },
        showCreate(state, action) {
            state.create = true
        },
        hideCreate(state, action) {
            state.create = false
        }
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice;