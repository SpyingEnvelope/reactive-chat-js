import { useEffect, useState } from "react";
import { Image, Button, Modal, Form, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { wordsActions } from "../store/words-slice";
import ImageSearch from "./ImageSearch";

const CreateModal = () => {
  const showCreate = useSelector((state) => state.modal.create);
  const userName = useSelector((state) => state.login.username);
  const page = useSelector((state) => state.words.page);
  const profileName = useSelector((state) => state.words.profile);
  const [text, setText] = useState("");
  const [type, setType] = useState("text");
  const [visibility, setVisibility] = useState(true);
  const [image, setImage] = useState(
    "https://d18vdu4p71yql0.cloudfront.net/libraries/arasaac/square.png"
  );
  const [background, setBackground] = useState("white");
  const [speak, setSpeak] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(false);
  const [replaceImage, setReplaceImage] = useState(false);
  const requestURL = useSelector((state) => state.login.requestURL);
  const dispatch = useDispatch();

  const preventEnter = (event) => {
    event.preventDefault();
    createButton();
  };
  const typeHandler = (event) => {
    setType(event.target.value);
  };

  const createButton = async () => {
    setCreating(true);
    setError(false);
    if (text == "") {
      setError("Text cannot be left empty");
      setCreating(false);
      return;
    }
    try {
      const request = await fetch(requestURL + "api/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          type: type,
          visible: visibility,
          image: image,
          background: background,
          page: page,
          profile: profileName,
          user: userName,
          row: 1,
          column: 5,
          speak: speak,
        }),
      });

      if (!request.ok) {
        throw new Error("failed");
      }

      const response = await request.json();

      if (response.error) {
        throw new Error("failed");
      }

      setCreating(false);
      setError(false);
      dispatch(wordsActions.updatedTrue());
      cancelModal();
    } catch (error) {
      setError("Failed to create button. Please try again later.");
      setCreating(false);
    }
  };

  const backgroundHandler = (event) => {
    setBackground(event.target.value);
  };

  const speakHandler = () => {
    setSpeak((prevState) => !prevState);
  };

  const cancelModal = () => {
    dispatch(modalActions.hideCreate());
    setTimeout(() => {
      setText("");
      setType("text");
      setVisibility(true);
      setImage(
        "https://d18vdu4p71yql0.cloudfront.net/libraries/arasaac/square.png"
      );
      setBackground("white");
      setSpeak(true);
      setError(false);
    }, 200);
  };

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const visibilityHandler = () => {
    setVisibility((prevState) => !prevState);
  };

  const imageOn = () => {
    setReplaceImage(true);
  };

  const imageOff = () => {
    setReplaceImage(false);
  };

  if (replaceImage) {
    return <ImageSearch imageOff={imageOff} setImage={setImage} />;
  }

  return (
    <Modal
      show={showCreate}
      onHide={cancelModal}
      centered
      className="text-center"
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Create New Button</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <Form onSubmit={preventEnter}>
          <Form.Group controlId="text">
            <Form.Label>
              <strong>Text</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={text}
              onChange={textHandler}
              style={{ textAlign: "center" }}
            />
          </Form.Group>
          <Row style={{ paddingTop: "10px" }}>
            <Form.Label>
              <strong>Is this button a text or folder?</strong>
            </Form.Label>
          </Row>
          <Form.Check
            inline
            label="Text"
            type="radio"
            name="textorfolder"
            value="text"
            onChange={typeHandler}
            checked={type == "text" ? true : false}
          />
          <Form.Check
            inline
            label="Folder"
            type="radio"
            name="textorfolder"
            value="folder"
            onChange={typeHandler}
            checked={type == "folder" ? true : false}
          />
          <Row style={{ paddingTop: "10px" }}>
            <Form.Label>
              <strong>Hide/Show Button</strong>
            </Form.Label>
          </Row>
          <Row>
            <Form.Text>
              {visibility ? "Button is visible" : "Button is hidden"}
            </Form.Text>
          </Row>
          <Form.Check
            type="switch"
            onChange={visibilityHandler}
            checked={visibility}
          />
          <Row>
            <Form.Label>
              <strong>Image</strong>
            </Form.Label>
          </Row>
          <Row>
            <Form.Text>press image to edit</Form.Text>
          </Row>
          <Image
            src={image}
            style={{ width: "70%", paddingTop: "20px" }}
            onClick={imageOn}
          />
          <Row style={{ paddingTop: "10px" }}>
            <Form.Label>
              <strong>Speak when pressed?</strong>
            </Form.Label>
          </Row>
          <Row>
            <Form.Text>
              {speak ? "Text to Speech is on" : "Text to Speech is off"}
            </Form.Text>
          </Row>
          <Form.Check type="switch" onChange={speakHandler} checked={speak} />

          <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Form.Label>
              <strong>Background Color</strong>
            </Form.Label>
          </Row>
          <Form.Check
            inline
            label="Pink"
            type="radio"
            name="background"
            value="pink"
            onChange={backgroundHandler}
            checked={background == "pink" ? true : false}
          />
          <Form.Check
            inline
            label="Blue"
            type="radio"
            name="background"
            value="blue"
            onChange={backgroundHandler}
            checked={background == "blue" ? true : false}
          />
          <Form.Check
            inline
            label="Purple"
            type="radio"
            name="background"
            value="purple"
            onChange={backgroundHandler}
            checked={background == "purple" ? true : false}
          />
          <Form.Check
            inline
            label="Green"
            type="radio"
            name="background"
            value="green"
            onChange={backgroundHandler}
            checked={background == "green" ? true : false}
          />
          <Form.Check
            inline
            label="White"
            type="radio"
            name="background"
            value="white"
            onChange={backgroundHandler}
            checked={background == "white" ? true : false}
          />
        </Form>
        <Container
          className="d-flex flex-row"
          style={{ justifyContent: "flex-end" }}
        >
          <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Button
              variant="dark"
              onClick={cancelModal}
              disabled={creating ? true : false}
              style={{padding: '20px'}}
            >
              Cancel
            </Button>
          </Row>
          <Row style={{ paddingLeft: "20px" }}>
            <Button
              variant="success"
              onClick={createButton}
              disabled={creating ? true : false}
            >
              {creating ? "Creating button..." : "Submit"}
            </Button>
          </Row>
        </Container>
      </Modal.Body>
      {/* <Button
        variant="success"
        onClick={createButton}
        disabled={creating ? true : false}
      >
        {creating ? "Creating button..." : "Submit"}
      </Button>
      <Button
        variant="danger"
        onClick={cancelModal}
        disabled={creating ? true : false}
      >
        Cancel
      </Button> */}
    </Modal>
  );
};

export default CreateModal;
