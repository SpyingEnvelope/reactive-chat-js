import { useEffect, useState } from "react";
import { Container, Image, Button, Modal, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { wordsActions } from "../store/words-slice";

const ModalOverlay = () => {
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

  const cancelModal = () => {
    dispatch(modalActions.hideModal());
    setTimeout(() => {
      setText(data.text);
      setType(data.type);
      setVisibility(data.visible);
      setImage(data.image);
      setBackground(data.background);
      setSpeak(data.speak);
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
        throw new Error('failed')
      }

      const response = request.json();

      if (response.error) {
        throw new Error('failed')
      }

      setUpdating(false);
      setError(false);
      dispatch(modalActions.hideModal());
      dispatch(wordsActions.updatedTrue());
    } catch (error) {
      setUpdating(false);
      setError('Failed to update data. Please try again later.')
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={cancelModal}
      centered
      className="text-center"
    >
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="text">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              value={text}
              onChange={textHandler}
              style={{ textAlign: "center" }}
            />
          </Form.Group>
          <Form.Check
            inline
            label="Text"
            type="radio"
            name="textorfolder"
            value="text"
            onChange={typeHandler}
            checked={type == "text" ? true : false}
            style={{ paddingTop: "10px" }}
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
          <Image src={image} style={{ width: "70%", paddingTop: "20px" }} />
          <Row>
            <Form.Text>
              {speak ? "Text to Speech is on" : "Text to Speech is off"}
            </Form.Text>
          </Row>
          <Form.Check type="switch" onChange={speakHandler} checked={speak} />
        </Form>
        <Row style={{paddingTop: '10px', paddingBottom: '10px'}}>
          <Form.Text>Background Color</Form.Text>
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
      </Modal.Body>
      <Button variant="success" onClick={updateData} disabled={updating ? true : false}>
        {updating ? 'Updating button' : 'Submit'}
      </Button>
      <Button variant="danger" onClick={cancelModal}>
        Cancel
      </Button>
    </Modal>
  );
};

export default ModalOverlay;
