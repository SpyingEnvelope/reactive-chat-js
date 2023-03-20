import { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";

const ReportModal = () => {
  const showReport = useSelector((state) => state.modal.report);
  const requestURL = useSelector((state) => state.login.requestURL);
  const [error, setError] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const cancelReport = () => {
    dispatch(modalActions.hideReport());
    setError(false);
    setReporting(false);
    setSuccess(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setReporting(true);
    if (
      event.target.bug.value.length == 0 ||
      event.target.beforeBug.value == 0
    ) {
      setError("Fields cannot be left empty");
      setReporting(false);
      return;
    }
    setError(false);

    try {
      const request = await fetch(requestURL + "api/report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bug: event.target.bug.value,
          antecedent: event.target.beforeBug.value,
        }),
      });

      if (!request.ok) {
        throw new Error('request failed')
      }
      
      const response = await request.json();

      if (response.error) {
        throw new Error('Server failed to save the error')
      };

      setSuccess(true);
    } catch (error) {
        setReporting(false);
        setError('There was an error sending the bug report. Please try again later.')
    }
  };

  useEffect(() => {
    if (success) {
        setTimeout(() => {
            cancelReport();
        }, 2000)
    }
  }, [success])

  return (
    <Modal
      show={showReport}
      onHide={cancelReport}
      centered
      className="text-center"
    >
    {success && <h1 style={{color: 'green'}}>Bug submitted successfully. Thank you!</h1>}
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>Report a Bug</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="bug">
            <Form.Label style={{ color: "black" }}>
              <strong>What happened?</strong>
            </Form.Label>
            <Form.Control
              type="text"
              style={{ textAlign: "center" }}
              as="textarea"
              rows={5}
            />
          </Form.Group>
          <Form.Group controlId="beforeBug">
            <Form.Label style={{ color: "black" }}>
              <strong>What happened right before the bug occurred?</strong>
            </Form.Label>
            <Form.Control
              type="text"
              style={{ textAlign: "center" }}
              as="textarea"
              rows={5}
            />
          </Form.Group>

          <Container
            className="d-flex flex-row"
            style={{ justifyContent: "flex-end", paddingTop: "10px" }}
          >
            <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <Button
                variant="dark"
                onClick={cancelReport}
                disabled={reporting ? true : false}
                style={{ padding: "20px" }}
              >
                Cancel
              </Button>
            </Row>
            <Row style={{ paddingLeft: "20px" }}>
              <Button
                variant="success"
                disabled={reporting ? true : false}
                type="submit"
              >
                {reporting ? "Reporting bug..." : "Submit"}
              </Button>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
