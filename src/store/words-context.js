import React, { useState } from 'react';

export const WordsContext = React.createContext({
    words: [],
    addWord: () => {}
});

export default (props) => {
    const [wordsList, setWordsList] = useState([]);

    const addWord = word => {
        setWordsList(prevWords => [...prevWords, word])
    }

    return (
        <WordsContext.Provider value={{
            words: wordsList,
            addWord: addWord
        }}>
            {props.children}
        </WordsContext.Provider>
    )
}