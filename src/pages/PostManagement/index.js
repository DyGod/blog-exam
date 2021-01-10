import { Helmet } from "react-helmet";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import PostTable from "../../components/PostTable";
import { Link } from "react-router-dom";

const PostManagement = (props) => {
  return (
    <div>
      <Helmet>
        <title>Posts Management | Lifestyle Blog</title>
      </Helmet>
      <Container className="mt-3">
        <Card>
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <h3>Post Management</h3>
              </Col>
              <Col className="text-right">
                <Button
                  as={Link}
                  variant="outline-primary"
                  to="/post-management/new"
                >
                  {" "}
                  Create New post
                </Button>
              </Col>
            </Row>
            <PostTable />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PostManagement;
