import { useEffect, useState } from "react";
import { Container, Image, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";

const ModalOverlay = () => {
  const showModal = useSelector((state) => state.modal.show);
  const data = useSelector((state) => state.modal.data);
  const [text, setText] = useState(data.text);

  const dispatch = useDispatch();

  useEffect(() => {
    setText(data.text);
  }, [data.text]);

  const textHandler = (event) => {
    setText(event.target.value);
  };

  const cancelModal = () => {
    dispatch(modalActions.hideModal());
    setTimeout(() => {
        setText(data.text)
    }, 200)
  };

  return (
    <Modal show={showModal} onHide={cancelModal} centered className="text-center">
      <Modal.Header>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="text">
            <Form.Label>Text</Form.Label>
            <Form.Control type="text" value={text} onChange={textHandler} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Button variant="light" onClick={cancelModal}>
        Cancel
      </Button>
    </Modal>
  );
};

export default ModalOverlay;
