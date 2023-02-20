import { configureStore } from "@reduxjs/toolkit";

import wordsSlice from "./words-slice";

const store = configureStore({
    reducer: { words: wordsSlice.reducer }
});

export default store;