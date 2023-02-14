import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import WordsProvider from "./store/words-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WordsProvider>
    <App />
  </WordsProvider>
);
