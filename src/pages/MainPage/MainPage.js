
import { Container } from "react-bootstrap";
import TopHeader from "../../components/TopHeader";
import WordsArea from "../../components/WordsArea";
import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <TopHeader />
      <WordsArea />
    </Container>
  );
};

export default MainPage;
