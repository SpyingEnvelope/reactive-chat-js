import { configureStore } from "@reduxjs/toolkit";

import wordsSlice from "./words-slice";
import loginSlice from "./login-slice";
import modalSlice from "./modal-slice";

const store = configureStore({
    reducer: { words: wordsSlice.reducer, login: loginSlice.reducer, modal: modalSlice.reducer }
});

export default store;