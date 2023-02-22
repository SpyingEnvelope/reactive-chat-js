import { Container, Button, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from "./WordsArea.module.css";
import dummy_db from "./dummy_db";

const WordsArea = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const coreBoard = useSelector(state => state.words.coreBoard);
  const editMode = useSelector(state => state.words)

  const dispatch = useDispatch();

  const addWord = (word) => {
    speak({ text: word.text });
    dispatch(wordsActions.addWord({ word: word.text, image: word.image }));
  };

  const removeWord = () => {
    cancel();
    dispatch(wordsActions.removeWord());
  };

  const removeAllWords = () => {
    dispatch(wordsActions.removeAllWords());
  };

  const word_buttons = coreBoard.map((word) => {
    return (
      <Button
        onClick={() => word.visible ? addWord({ text: word.text, image: word.image }) : null}
        className={classes.wordbutton}
        variant="light"
        key={word.text}
        style={{backgroundColor: word.background}}
      >
        {word.visible ? 
        <>
        <Row>
          <Image src={word.image} style={{ width: "15vh", height: '9vh' }} />
        </Row>
        <Row>{word.text}</Row> </> : null}
      </Button>
    );
  });

  return (
    <Container
      fluid
      className="h-75 d-flex"
      style={{ border: '1px solid black', backgroundColor: 'yellow', paddingTop: '10px' }}
    >
      {word_buttons}
    </Container>
  );
};

export default WordsArea;
