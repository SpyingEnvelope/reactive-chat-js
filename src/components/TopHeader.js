import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    wordsList.forEach((word) => {
      speak({ text: word.word });
    });
  };

  const removeAllWords = () => {
    cancel();
    dispatch(wordsActions.removeAllWords());
  };

  useEffect(() => {
    if (displayWords.length > 0) {
      const lastElementId = displayWords[displayWords.length - 1].props.id;
      const element = document.getElementById(lastElementId);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [wordsList]);

  const displayWords = wordsList.map((word, index) => {
    return (
      <Col
        style={{ height: "50%", paddingTop: "5vh" }}
        className="d-flex flex-column text-center align-items-center"
        key={index}
        id={index}
        xs={6}
        sm={4}
        md={3}
        lg={2}
      >
        <Image src={word.image} className={classes.imagesize} />
        {word.word}
      </Col>
    );
  });

  return (
    <Container
      fluid
      className="d-flex overflow-hidden"
      style={{ border: "1px solid black", height: "20vh", backgroundColor: 'white' }}
    >
      <Row
        className="d-flex flex-row overflow-scroll flex-nowrap justify-content-start"
        style={{width: '90%'}}
        onClick={playAllWords}
        xs={10}
      >
        {displayWords}
      </Row>
      <Row xs={2} style={{ flexGrow: 1}}>
        <button onClick={removeWord} className={classes.buttons}>
          <FontAwesomeIcon icon={faDeleteLeft} className={classes.deleteicon} />
        </button>
        <button className={classes.buttons} onClick={removeAllWords}>
          <FontAwesomeIcon icon={faTrash} className={classes.deleteicon} />
        </button>
      </Row>
    </Container>
  );
};

export default TopHeader;
