import { Container, Button, Image, Row, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { modalActions } from "../store/modal-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import classes from "./WordsArea.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CreateButton from "./CreateButton";

const WordsArea = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const coreBoard = useSelector((state) => state.words.coreBoard);
  const editMode = useSelector((state) => state.words.edit);
  const username = useSelector((state) => state.login.username);
  const updated = useSelector((state) => state.words.updated);
  const profileName = useSelector((state) => state.words.profile);
  const page = useSelector((state) => state.words.page);
  const requestURL = useSelector((state) => state.login.requestURL);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    dispatch(modalActions.setModalData(data));
    dispatch(modalActions.showModal());
  };

  // Retrieve data function
  const retrieveCoreData = async () => {
    try {
      const request = await fetch(requestURL + "api/retrieve/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (!request.ok) {
        throw new Error("Could not retrieve data. Please try again");
      }

      const response = await request.json();
      dispatch(wordsActions.setCoreBoard(response))
      setLoading(false);
      console.log(response)
      if (response.error) {
        throw new Error("Could not retrieve data. Please try again");
      }
    } catch (e) {
      setError("Could not retrieve data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coreBoard.length == 0) {
      retrieveCoreData();
    }

    if (updated) {
      retrieveCoreData();
      setLoading(true);
      dispatch(wordsActions.updatedFalse());
    }
  }, [coreBoard, updated]);

  if (error) {
    return (
      <Container
        style={{ padding: 0 }}
        className="d-flex justify-content-center align-items-center flex-column"
        fluid
      >
        <Row>
          <h1>{error}</h1>
        </Row>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        style={{ padding: 0 }}
        className="d-flex justify-content-center align-items-center flex-column"
        fluid
      >
        <Row style={{ paddingTop: "20px" }}>
          <Spinner animation="grow" role="status" size="lg" />
        </Row>
        <Row>
          <h1>Retrieving data....</h1>
        </Row>
      </Container>
    );
  }

  const filteredBoard = coreBoard.filter((word) => word.profile == profileName).filter((word) => word.page == page);

  const word_buttons = filteredBoard.map((word) => {
    return (
      <Card
        className={classes.cardbutton}
        onClick={() =>
          word.visible && !editMode ? addWord({ text: word.text, image: word.image }) : null
        }
        style={{ backgroundColor: word.background, opacity: !word.visible && !editMode ? 0 : 1  }}
        key={word['_id']}
      >
        <Card.Img
          variant="top"
          src={word.image}
          style={{ width: "100%", height: "100%"}}
        />
        <Card.Body>
          <Card.Title>{word.text}</Card.Title>
          { word.visible ? null : <FontAwesomeIcon icon={faEyeSlash} size='lg' color="black" style={{position: 'fixed', transform: 'translateY(-50%) translateX(-50%)'}} />}
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
                speak: word.speak,
                id: word['_id'],
              });
            }}
          >
            Edit
          </Button>
        ) : null}
        
      </Card>
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
        overflow: 'scroll'
      }}
    >
      {word_buttons}
      {editMode ? <CreateButton styleButton={classes.cardbutton}/> : null}
    </Container>
  );
};

export default WordsArea;
