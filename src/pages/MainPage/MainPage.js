
import { Container } from "react-bootstrap";
import TopHeader from "../../components/TopHeader";
import WordsArea from "../../components/WordsArea";
import ConfigPanel from "../../components/ConfigPanel";
import EditModal from "../../components/EditModal";
import CreateModal from "../../components/CreateModal";
import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <EditModal />
      <CreateModal />
      <TopHeader />
      <ConfigPanel />
      <WordsArea />
    </Container>
  );
};

export default MainPage;
