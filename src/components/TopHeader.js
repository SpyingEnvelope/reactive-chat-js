import { Container } from "react-bootstrap";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  return (
    <Container fluid className='d-flex h-25' style={{ backgroundColor: "green"}}>
      <h1>Hello</h1>
    </Container>
  );
};

export default TopHeader;
