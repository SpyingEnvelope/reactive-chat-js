import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faHouse, faTrash } from "@fortawesome/free-solid-svg-icons";
import './ConfigPanel.css';

const ConfigPanel = () => {
    const { cancel } = useSpeechSynthesis();

    const editMode = useSelector(state => state.words.edit);
    const dispatch = useDispatch();

    const editTrue = () => {
        dispatch(wordsActions.changeEdit(true))
    };

    const editFalse = () => {
        dispatch(wordsActions.changeEdit(false))
    };

    const goHome = () => {
        dispatch(wordsActions.changePage('homepage'));
    };

    const removeAllWords = () => {
        cancel();
        dispatch(wordsActions.removeAllWords());
    };

    return (
        <Container fluid className="container-background d-flex justify-content-end align-items-center container-10">
            <button className="trash-button" onClick={removeAllWords}><FontAwesomeIcon icon={faTrash}  /> Clear All</button>
            <button onClick={goHome} className="home-button"><FontAwesomeIcon icon={faHouse}
            /> Home</button>
            <button className="edit-button" onClick={editMode ? editFalse : editTrue}>
               <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
        </Container>
    )
};

export default ConfigPanel;