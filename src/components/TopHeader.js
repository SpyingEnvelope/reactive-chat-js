import { Container, Row, Button, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  const dispatch = useDispatch();
  const wordsList = useSelector((state) => state.words.words);
  const { cancel } = useSpeechSynthesis();

  const removeWord = () => {
    cancel();
    dispatch(wordsActions.removeWord());
  };

  console.log(wordsList);

  const displayWords = wordsList.map((word) => {
    return (
      <Col
        style={{ width: "20%", height: "50%", paddingTop: "5vh" }}
        className="d-flex flex-column text-center"
        key={Math.random()}
      >
        <Image src={word.image} style={{ width: "8vw", height: "13vh" }} />
        {word.word}
      </Col>
    );
  });

  return (
    <Container
      fluid
      className="d-flex h-25"
      style={{ border: "1px solid black" }}
    >
      <Row className="d-flex flex-row overflow-scroll flex-nowrap">
        {displayWords}
      </Row>
      <Row style={{ justifySelf: "flex-end" }}>
        <Button onClick={removeWord} className={classes.delete} variant="light">
          Delete
        </Button>
      </Row>
    </Container>
  );
};

export default TopHeader;
