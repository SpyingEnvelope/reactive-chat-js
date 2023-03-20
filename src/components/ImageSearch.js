import {
  Container,
  Image,
  Button,
  Modal,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";

import classes from "./ImageSearch.module.css";

const ImageSearch = (props) => {
  const [error, setError] = useState(false);
  const [special, setSpecial] = useState(false);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [retrieving, setRetrieving] = useState(false);

  const retrieveData = async (value) => {
    const testRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    if (testRegex.test(value)) {
      setSpecial(true);
      return
    }
    setSpecial(false);
    setData([]);
    setRetrieving(true);
    try {
      const request = await fetch(
        `https://symbotalkapiv1.azurewebsites.net/search/?name=${value}&lang=en&repo=all&limit=10`
      );

      if (!request.ok) {
        throw new Error("req failed");
      }

      const response = await request.json();

      setSearched(true);
      setError(false);
      setRetrieving(false);
      setData(response);
    } catch (error) {
      if (error != "req failed") {
        setSearched(true);
        setRetrieving(false);
        setError(false);
        return;
      }
      setError("Failed to retrieve data. Please try again later");
      setRetrieving(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSearched(false);
    setData([]);
    if (event.target.searchInput.value.length == 0) {
      setError("Input cannot be left empty");
      return;
    }
    setError(false);
    retrieveData(event.target.searchInput.value);
  };

  const imageHandler = (url) => {
    props.setImage(url);
    props.imageOff();
  };

  const dataZero = data.length == 0;

  const displayData = data.map((result) => {
    return (
      <Row
        className={classes.imageRow}
        key={result.id}
        onClick={() => imageHandler(result["image_url"])}
      >
        <Image
          src={result["image_url"]}
          style={{ maxWidth: "100%", maxHeight: "100%", border: '1px solid black' }}
        />
      </Row>
    );
  });

  return (
    <Container
      fluid
      style={{
        zIndex: 1,
        height: "100vh",
        position: "fixed",
        background: "white",
        overflow: "scroll",
      }}
      className="text-center d-flex align-items-center flex-column"
    >
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <p>Search for Images</p>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Group controlId="searchInput" style={{padding: '10px'}}>
          <Form.Control type="text" style={{ textAlign: "center" }} />
        </Form.Group>
        <Button
          type="submit"
          style={{ height: "100%", alignSelf: "flex-end" }}
          variant="dark"
        >
          Search
        </Button>
      </Form>
      {special && <p style={{color: 'red'}}>Search field cannot contain special characters</p>}
      {retrieving && (
        <>
          <Row style={{ paddingTop: "20px" }}>
            <Spinner animation="grow" role="status" size="lg" />
          </Row>
          <Row>
            <h1>Retrieving data....</h1>
          </Row>{" "}
        </>
      )}
      {searched && dataZero ? <h1>No results found</h1> : null}
      {displayData}
      { dataZero && <Row style={{padding: '10px'}} />}
      <Button
        variant="danger"
        onClick={props.imageOff}
        style={{ height: "40px" }}
      >
        Cancel
      </Button>
    </Container>
  );
};

export default ImageSearch;
