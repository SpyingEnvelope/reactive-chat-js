import { useState } from "react";
import { Container, Row, Image, Form, Button } from "react-bootstrap";
import './LoginPage.css';
import logo from '../../assets/reactive-logo.png';
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";


const LoginPage = () => {
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);

    const registerOn = () => {
        setRegister(true);
        setLogin(false);
    }

    const registerOff = () => {
        setRegister(false);
        setLogin(true);
    }

    return (
        <Container fluid className="w-100 background-reactive d-flex flex-column justify-content-center text-center align-items-center">
            <Row><p className='alpha'>Alpha v1.0.0</p></Row>
            <Row><Image src={logo} className='logo'/></Row>
            {login && <LoginForm registerOn={registerOn} />}
            {register && <RegisterForm loginOn={registerOff} />}
        </Container>
    )
};

export default LoginPage;