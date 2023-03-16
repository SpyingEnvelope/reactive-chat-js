import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { useLongPress } from "use-long-press";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  const dispatch = useDispatch();
  const wordsList = useSelector((state) => state.words.words);
  const { speak, cancel } = useSpeechSynthesis();

  const bind = useLongPress(() => {
    cancel();
    dispatch(wordsActions.removeAllWords());
  });

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

  useEffect(() => {
    if (displayWords.length > 0) {
      const lastElementId = displayWords[displayWords.length - 1].props.id
      const element = document.getElementById(lastElementId)
      element.scrollIntoView({behavior: 'smooth'})
    }
  }, [wordsList]);

  const displayWords = wordsList.map((word, index) => {
    return (
      <Col
        style={{ height: "50%", paddingTop: "5vh" }}
        className="d-flex flex-column text-center"
        key={index}
        id={index}
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
      style={{ border: "1px solid black", height: "20vh" }}
    >
      <Row
        className="d-flex flex-row overflow-scroll flex-nowrap"
        onClick={playAllWords}
      >
        {displayWords}
      </Row>
      <Row style={{ justifySelf: "flex-end" }}>
        <button {...bind()} onClick={removeWord} className={classes.delete}>
          <FontAwesomeIcon icon={faDeleteLeft} className={classes.deleteicon} />
        </button>
      </Row>
    </Container>
  );
};

export default TopHeader;
