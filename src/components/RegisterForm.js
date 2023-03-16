import { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Form, Button } from "react-bootstrap";
import "./RegisterForm.css";

const RegisterForm = (props) => {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [sendingReq, setSendingReq] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const requestURL = useSelector((state) => state.login.requestURL);

  const submitHandler = async (event) => {
    event.preventDefault();

    // Beginning of input authentication
    const testRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    if (event.target.formPassword.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      if (event.target.formPassword.value != event.target.formRepeat.value) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(false);
      }
    }

    if (
      event.target.formEmail.value.length < 7 ||
      !event.target.formEmail.value.includes("@")
    ) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(false);
    }

    if (event.target.formUser.value.length < 3) {
      setUserError("Username must be at least 3 characters long");
    } else {
      setUserError(false);
    }

    if (testRegex.test(event.target.formUser.value)) {
      setUserError(
        'Username cannot contain special characters except for dot "."'
      );
    } else {
      setUserError(false);
    }

    if (passwordError || emailError || userError) {
      return;
    }
    // End of input authentication

    // Beginning of server request
    setSendingReq(true);
    try {
      const request = await fetch(requestURL + "api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.formUser.value,
          password: event.target.formPassword.value,
          email: event.target.formEmail.value,
        }),
      });

      if (!request.ok) {
        throw new Error("request failed");
      }

      const response = await request.json();

      if (response.error) {
        throw new Error(response.error);
      }

      setSendingReq(false);
      setRegisterError(false);
      setSuccessful(
        "Username registered successfully! Redirecting to login page."
      );
      setTimeout(props.loginOn, 3000);
    } catch (error) {
      if (error.message == "email taken") {
        setRegisterError("Email is already in use");
      } else if (error.message == "username taken") {
        setRegisterError("Username is already in use");
      } else {
        setRegisterError("Unknown error occurred. Please try again later.");
      }
      setSendingReq(false);
    }
  };

  if (successful) {
    return (
      <>
        <h2 style={{ color: "white" }}>Username registered successfully!</h2>
        <p style={{ color: "white" }}>Redirecting to login page.</p>
      </>
    );
  }

  return (
    <>
      <Row>
        {userError && <p style={{ color: "red" }}>{userError}</p>}
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        {registerError && <p style={{ color: "red" }}>{registerError}</p>}
      </Row>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className="text-center"
          />
          <Form.Text>Username cannot contain special characters</Form.Text>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="text-center"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            className="text-center"
          />
        </Form.Group>
        <Form.Group controlId="formRepeat">
          <Form.Label className="form-label"> Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            className="text-center"
          />
        </Form.Group>
        <Button
          variant="light"
          type="submit"
          style={{ marginTop: "10px" }}
          disabled={sendingReq}
        >
          {sendingReq ? "Registering new user" : "Register"}
        </Button>
      </Form>
      <Button
        variant="primary"
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onClick={props.loginOn}
        disabled={sendingReq}
      >
        Cancel
      </Button>
    </>
  );
};

export default RegisterForm;
