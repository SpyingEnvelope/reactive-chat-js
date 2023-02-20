import { Container, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { wordsActions } from "../store/words-slice";


const WordsArea = () => {
    const dispatch = useDispatch();

    const addWord = (word) => {
        dispatch(wordsActions.addWord({word}))
    };

    const removeWord = () => {
        dispatch(wordsActions.removeWord());
    };

    const removeAllWords = () => {
        dispatch(wordsActions.removeAllWords());
    };

    return (
        <Container fluid className="h-75" style={{backgroundColor: 'blue'}}>
            <Button onClick={() => {addWord('listen')}}>Listen</Button>
            <Button onClick={removeWord}>Remove word</Button>
            <Button onClick={removeAllWords}>Remove all words</Button>
        </Container>
    )
};

export default WordsArea;