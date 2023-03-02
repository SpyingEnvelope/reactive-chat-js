import { Container, Button, Image, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { modalActions } from "../store/modal-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from "./WordsArea.module.css";
import dummy_db from "./dummy_db";
import ModalOverlay from "./ModalOverlay";

const WordsArea = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const coreBoard = useSelector((state) => state.words.coreBoard);
  const editMode = useSelector((state) => state.words.edit);
  const username = useSelector((state) => state.login.username);

  console.log(editMode);

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

  const modalHandler = (data) => {
    dispatch(modalActions.setModalData(data))
    dispatch(modalActions.showModal());
  };

  const word_buttons = coreBoard.map((word) => {
    return (
      <Card
        className={classes.cardbutton}
        onClick={() =>
          word.visible ? addWord({ text: word.text, image: word.image }) : null
        }
        style={{ backgroundColor: word.background }}
      >
        <Card.Img
          variant="top"
          src={word.image}
          style={{ width: "100%", height: "100%" }}
        />
        <Card.Body>
          <Card.Title>{word.text}</Card.Title>
        </Card.Body>
        {editMode ? (
          <Button
            variant="light"
            style={{ position: "fixed" }}
            onClick={() => {
              modalHandler({
                text: word.text,
                type: word.type,
                visible: word.visible,
                image: word.image,
                background: word.background,
                id: word.id
              });
            }}
          >
            Edit
          </Button>
        ) : null}
      </Card>
      // <Container
      //   onClick={() => word.visible ? addWord({ text: word.text, image: word.image }) : null}
      //   className={classes.wordbutton}
      //   key={word.text}
      //   style={{backgroundColor: word.background}}
      // >
      //   {word.visible ?
      //   <>
      //   <Row>
      //     <Image src={word.image} style={{ width: "100%", height: '9vh' }} />
      //   </Row>
      //   <Row>{word.text}</Row> </> : null}
      // </Container>
    );
  });

  return (
    <Container
      fluid
      className="h-75 d-flex"
      style={{
        border: "1px solid black",
        backgroundColor: "yellow",
        paddingTop: "10px",
        justifyContent: "space-around",
      }}
    >
      {word_buttons}
    </Container>
  );
};

export default WordsArea;
