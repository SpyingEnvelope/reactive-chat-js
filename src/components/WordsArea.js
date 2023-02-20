import { Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { SayButton } from "react-say";
import Say from "react-say/lib/Say";

const WordsArea = () => {
  const dispatch = useDispatch();

  const addWord = (word) => {
    dispatch(wordsActions.addWord({ word }));
  };

  const removeWord = () => {
    dispatch(wordsActions.removeWord());
  };

  const removeAllWords = () => {
    dispatch(wordsActions.removeAllWords());
  };

  return (
    <Container fluid className="h-75" style={{ backgroundColor: "blue" }}>
      <Button
        onClick={() => {
          addWord("Listen");
        }}
        as={SayButton}
        text='Listen'
      >
        Listen
      </Button>
      <Button onClick={removeWord}>Remove word</Button>
      <Button onClick={removeAllWords}>Remove all words</Button>
    </Container>
  );
};

export default WordsArea;
