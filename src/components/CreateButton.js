import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { modalActions } from "../store/modal-slice";

const CreateButton = (props) => {
    const dispatch = useDispatch();

    const createOn = () => {
        dispatch(modalActions.showCreate());
    };

  return (
    <Button
      className={`${props.styleButton} d-flex align-items-center justify-content-center`}
      style={{ position: "fixed", right: "2%" }}
      variant="light"
      onClick={createOn}
    >
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </Button>
  );
};

export default CreateButton;
