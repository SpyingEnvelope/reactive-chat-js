import { Container, Row, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  const dispatch = useDispatch();
  const wordsList = useSelector((state) => state.words.words);
  const { speak, cancel } = useSpeechSynthesis();

  const removeWord = () => {
    cancel();
    dispatch(wordsActions.removeWord());
  };

  const playAllWords = () => {
    cancel();
    wordsList.forEach(word => {
      speak({ text: word.word });
    })
  }

  const displayWords = wordsList.map((word) => {
    return (
      <Col
        style={{ height: "50%", paddingTop: "5vh" }}
        className="d-flex flex-column text-center"
        key={Math.random()}
      >
        <Image src={word.image} className={classes.imagesize} />
        {word.word}
      </Col>
    );
  });

  return (
    <Container
      fluid
      className="d-flex"
      style={{ border: "1px solid black", height: '20vh' }}
    >
      <Row className="d-flex flex-row overflow-scroll flex-nowrap" onClick={playAllWords}>
        {displayWords}
      </Row>
      <Row style={{ justifySelf: "flex-end" }}>
        <button onClick={removeWord} className={classes.delete} >
          <FontAwesomeIcon icon={faDeleteLeft} className={classes.deleteicon} />
        </button>
      </Row>
    </Container>
  );
};

export default TopHeader;
