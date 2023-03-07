import { createSlice } from "@reduxjs/toolkit";
import dummy_db from "../components/dummy_db";

const wordsSlice = createSlice({
    name: "words",
    initialState: {
        words: [],
        coreBoard: [],
        edit: false,
        updated: false
    },
    reducers: {
        addWord(state, action) {
            state.words = [...state.words, action.payload]
        },
        removeWord(state, action) {
            let newWords = [...state.words];
            newWords.pop();
            state.words = newWords;
        },
        removeAllWords(state, action) {
            state.words = [];
        },
        changeEdit(state, action) {
            state.edit = action.payload;
        },
        setCoreBoard(state, action) {
            state.coreBoard = action.payload;
        },
        updatedTrue(state, action) {
            state.updated = true
        },
        updatedFalse(state, action) {
            state.updated = false
        }
    }
});

export const wordsActions = wordsSlice.actions;

export default wordsSlice;