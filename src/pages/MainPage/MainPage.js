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
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReportModal from "../../components/ReportModal";

const MainPage = () => {
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  const handle = useFullScreenHandle();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }

  }, [isLogged]);

  return (
    <FullScreen handle={handle}>
      <Container fluid style={{ height: "100vh", padding: "0px" }} >
        <EditModal />
        <CreateModal />
        <ReportModal />
        <TopHeader />
        <ConfigPanel handle={handle} />
        <WordsArea />
      </Container>
    </FullScreen>
  );
};

export default MainPage;
