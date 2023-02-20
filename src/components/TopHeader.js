import { Container, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { wordsActions } from "../store/words-slice";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  const dispatch = useDispatch();
  const wordsList = useSelector((state) => state.words.words);

  const removeWord = () => {
    dispatch(wordsActions.removeWord());
  };

  return (
    <Container
      fluid
      className="d-flex h-25"
      style={{ backgroundColor: "green" }}
    >
      <Row className="d-flex flex-row">{wordsList}</Row>
      <Row style={{justifySelf: 'flex-end'}}>
        <Button onClick={removeWord} className={classes.delete}>
          Delete
        </Button>
      </Row>
    </Container>
  );
};

export default TopHeader;
