
import { Container } from "react-bootstrap";
import TopHeader from "../../components/TopHeader";
import WordsArea from "../../components/WordsArea";
import ConfigPanel from "../../components/ConfigPanel";
import ModalOverlay from "../../components/ModalOverlay";
import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <ModalOverlay />
      <TopHeader />
      <ConfigPanel />
      <WordsArea />
    </Container>
  );
};

export default MainPage;
