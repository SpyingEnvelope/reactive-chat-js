import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { modalActions } from "../store/modal-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faHouse,
  faMinimize,
  faMaximize,
  faBug,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import "./ConfigPanel.css";
import { useState } from "react";

const ConfigPanel = (props) => {
  const [fullscreen, setFullscreen] = useState(false);

  const editMode = useSelector((state) => state.words.edit);
  const history = useSelector((state) => state.words.history)
  const histLength = history.length;
  const histLengthBool = histLength > 0;
  const dispatch = useDispatch();

  const editTrue = () => {
    dispatch(wordsActions.changeEdit(true));
  };

  const editFalse = () => {
    dispatch(wordsActions.changeEdit(false));
  };

  const goHome = () => {
    dispatch(wordsActions.changePage("homepage"));
    dispatch(wordsActions.removeAllHistory());
  };

  const showReport = () => {
    dispatch(modalActions.showReport());
  };

  const fullscreenHandler = () => {
    if (fullscreen) {
      props.handle.exit();
    } else {
      props.handle.enter();
    }
    setFullscreen((prevState) => !prevState);
  };

  const backHandler = () => {
    if (histLength == 0) {
      dispatch(wordsActions.removeAllHistory());
      dispatch(wordsActions.changePage('homepage'));
    } else if (histLength == 1) {
      dispatch(wordsActions.removeAllHistory());
      dispatch(wordsActions.changePage('homepage'));
    } else {
      dispatch(wordsActions.changePage(history[history.length - 2]))
      dispatch(wordsActions.removeLastHistory());
    }
  }

  return (
    <Container
      fluid
      className="container-background d-flex justify-content-between align-items-center container-10"
    >
      {!editMode && <button className="back-button" disabled={!histLengthBool} onClick={backHandler}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>}
      {!editMode && <button className="trash-button" onClick={fullscreenHandler}>
        <FontAwesomeIcon icon={fullscreen ? faMinimize : faMaximize} />
        {fullscreen ? " Minimize" : " Fullscreen"}
      </button>}
      {!editMode && (
        <button onClick={goHome} className="home-button">
          <FontAwesomeIcon icon={faHouse} /> Home
        </button>
      )}
      {editMode && <button className="home-button" onClick={showReport}>
        <FontAwesomeIcon icon={faBug} /> Report a bug
      </button>}
      <button className="edit-button" onClick={editMode ? editFalse : editTrue} disabled={fullscreen}>
        <FontAwesomeIcon icon={faPenToSquare} /> {fullscreen ? 'Disabled in FS' : 'Edit'}
      </button>
    </Container>
  );
};

export default ConfigPanel;
