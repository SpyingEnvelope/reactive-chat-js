
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import TopHeader from "../../components/TopHeader";
import WordsArea from "../../components/WordsArea";
import ConfigPanel from "../../components/ConfigPanel";
import EditModal from "../../components/EditModal";
import CreateModal from "../../components/CreateModal";
import classes from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/')
    }
  }, [isLogged]);

  return (
    <Container fluid style={{ height: '100vh', padding: '0px' }}>
      <EditModal />
      <CreateModal />
      <TopHeader />
      <ConfigPanel />
      <WordsArea />
    </Container>
  );
};

export default MainPage;
