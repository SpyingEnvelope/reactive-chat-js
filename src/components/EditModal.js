import { useEffect, useState } from "react";
import { Image, Button, Modal, Form, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { wordsActions } from "../store/words-slice";
import { confirm } from "react-bootstrap-confirmation";
import ImageSearch from "./ImageSearch";

const EditModal = () => {
  const showModal = useSelector((state) => state.modal.show);
  const data = useSelector((state) => state.modal.data);
  const [text, setText] = useState(data.text);
  const [type, setType] = useState(data.type);
  const [visibility, setVisibility] = useState(data.visible);
  const [image, setImage] = useState(data.image);
  const [background, setBackground] = useState(data.background);
  const [speak, setSpeak] = useState(data.speak);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [replaceImage, setReplaceImage] = useState(false);
  const requestURL = useSelector((state) => state.login.requestURL);

  const dispatch = useDispatch();

  useEffect(() => {
    setText(data.text);
    setType(data.type);
    setVisibility(data.visible);
    setImage(data.image);
    setBackground(data.background);
    setSpeak(data.speak);
  }, [data.id]);

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const typeHandler = (event) => {
    setType(event.target.value);
  };

  const visibilityHandler = () => {
    setVisibility((prevState) => !prevState);
  };

  const speakHandler = () => {
    setSpeak((prevState) => !prevState);
  };

  const backgroundHandler = (event) => {
    setBackground(event.target.value);
  };

  const imageOn = () => {
    setReplaceImage(true);
  };

  const imageOff = () => {
    setReplaceImage(false);
  };

  const preventEnter = (event) => {
    event.preventDefault();
    updateData();
  };

  const deleteHandler = async () => {
    const result = await confirm('Are you sure you want to delete?'); // Confirm deletion
    if (!result) {
      return;
    };

    setError(false);
    setUpdating(true);
    if (!data.id) {
      setError("id needed for deletion");
      return;
    }

    try {
      const request = await fetch(requestURL + "api/delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
        }),
      });

      if (!request.ok) {
        throw new Error("failed to delete");
      }

      const response = await request.json();

      if (response.error) {
        throw new Error("failed to delete");
      }

      setUpdating(false);
      setError(false);
      dispatch(modalActions.hideModal());
      dispatch(wordsActions.updatedTrue());
    } catch (error) {
      setUpdating(false);
      setError("Failed to delete. Please try again later.");
    }
  };

  const cancelModal = () => {
    dispatch(modalActions.hideModal());
    setTimeout(() => {
      setText(data.text);
      setType(data.type);
      setVisibility(data.visible);
      setImage(data.image);
      setBackground(data.background);
      setSpeak(data.speak);
      setError(false);
    }, 200);
  };

  const updateData = async () => {
    try {
      setUpdating(true);
      const request = await fetch(requestURL + "api/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          type: type,
          visible: visibility,
          image: image,
          background: background,
          speak: speak,
          id: data.id,
        }),
      });

      if (!request.ok) {
        throw new Error("failed");
      }

      const response = await request.json();

      if (response.error) {
        throw new Error("failed");
      }

      setUpdating(false);
      setError(false);
      dispatch(modalActions.hideModal());
      dispatch(wordsActions.updatedTrue());
    } catch (error) {
      setUpdating(false);
      setError("Failed to update data. Please try again later.");
    }
  };

  if (replaceImage) {
    return <ImageSearch imageOff={imageOff} setImage={setImage} />;
  }

  return (
    <Modal
      show={showModal}
      onHide={cancelModal}
      centered
      className="text-center"
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Edit</Modal.Title>
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
          <Row style={{ paddingLeft: "20px", paddingRight: '20px'}}>
            <Button
              variant="danger"
              disabled={updating ? true : false}
              onClick={deleteHandler}
              style={{ padding: "15px" }}
            >
              Delete
            </Button>
          </Row>
          <Row style={{ paddingLeft: "20px", paddingRight: '20px' }}>
            <Button
              variant="dark"
              onClick={cancelModal}
              disabled={updating ? true : false}
            >
              Cancel
            </Button>
          </Row>
          <Row style={{ paddingLeft: "20px" }}>
            <Button
              variant="success"
              onClick={updateData}
              disabled={updating ? true : false}
            >
              {updating ? "Updating button" : "Submit"}
            </Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
