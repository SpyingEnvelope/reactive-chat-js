import { useState } from "react";
import { Row, Form, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login-slice";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [passwordError, setPasswordError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [sendingReq, setSendingReq] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const requestURL = useSelector((state) => state.login.requestURL);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    // Beginning of input authentication
    const testRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    if (event.target.formPassword.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError(false);
    }

    if (event.target.formUsername.value.length < 3) {
      setUserError("Username must be at least 3 characters long");
    } else {
      setUserError(false);
    }
    if (testRegex.test(event.target.formUsername.value)) {
      setUserError(
        'Username cannot contain special characters except for dot "."'
      );
    } else {
      setUserError(false);
    }

    if (passwordError || userError) {
      return;
    }
    // End of input authentication

    // Beginning of server request
    setSendingReq(true);
    try {
      const request = await fetch(requestURL + "api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.formUsername.value,
          password: event.target.formPassword.value,
        }),
      });

      if (!request.ok) {
        throw new Error("request failed");
      }

      const response = await request.json();
      console.log(response);
      if (response.error) {
        throw new Error("Username or password was not found");
      }

      dispatch(loginActions.changeUser(event.target.formUsername.value));
      dispatch(loginActions.changeLogin(true))
      setSuccessful(true);
      setSendingReq(false);
      setLoginError(false);
      setTimeout(() => {
        navigate(`/reactivechat/${event.target.formUsername.value}/`)
      }, 2000)
    } catch (error) {
      setSendingReq(false);
      if (error.message == "Username or password was not found") {
        return setLoginError(error.message);
      }

      if (error.message == "request failed") {
        return setLoginError(
          "Problem sending login request. Please try again later"
        );
      }

      setLoginError("An unknown error occurred. Please try again later");
    }
  };

  if (successful) {
    return (
        <>
            <h2 style={{color: 'white'}}>Login Successful!</h2>
            <h3 style={{color: 'white'}}>Loading Data (please be patient)...</h3>
            <Spinner animation="grow" variant="light" />
        </>
    )
  }
  return (
    <>
      <Row>
        {userError && <p style={{ color: "red" }}>{userError}</p>}
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </Row>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
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
        <Button
          variant="light"
          type="submit"
          style={{ marginTop: "10px" }}
          disabled={sendingReq}
        >
          {sendingReq ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <Button
        variant="primary"
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onClick={props.registerOn}
        disabled={sendingReq}
      >
        Register
      </Button>
    </>
  );
};

export default LoginForm;
