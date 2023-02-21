import { createSlice } from "@reduxjs/toolkit";

const wordsSlice = createSlice({
    name: "words",
    initialState: {
        words: []
    },
    reducers: {
        addWord(state, action) {
            state.words = [...state.words, action.payload]
        },
        removeWord(state, action) {
            let newWords = [...state.words];
            let popped = newWords.pop();
            state.words = newWords;
        },
        removeAllWords(state, action) {
            state.words = [];
        }
    }
});

export const wordsActions = wordsSlice.actions;

export default wordsSlice;