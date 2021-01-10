import { Helmet } from "react-helmet";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import PostForm from "./../../components/PostForm";

const AddEditPost = (props) => {
  let { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>
          {" "}
          {id === "new" ? "New" : "Edit"} - Post Management | Lifestyle Blog
        </title>
      </Helmet>
      <Container className="my-3">
        <Card>
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <h3>{id === "new" ? "New" : "Edit"} Post</h3>
              </Col>
              <Col className="text-right">
                <Button as={Link} variant="link" to="/post-management">
                  {" "}
                  Go Back
                </Button>
              </Col>
            </Row>
            <PostForm postId={id} />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddEditPost;
