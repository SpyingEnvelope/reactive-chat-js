import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { wordsActions } from "../store/words-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import './ConfigPanel.css';

const ConfigPanel = () => {
    const editMode = useSelector(state => state.words.edit);
    const dispatch = useDispatch();

    const editTrue = () => {
        dispatch(wordsActions.changeEdit(true))
    };

    const editFalse = () => {
        dispatch(wordsActions.changeEdit(false))
    };

    return (
        <Container fluid className="container-background d-flex justify-content-end align-items-center container-10">
            <button className="edit-button" onClick={editMode ? editFalse : editTrue}>
               <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </button>
        </Container>
    )
};

export default ConfigPanel;