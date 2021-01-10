import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./../../components/Loader";
import Fetch from "./../../store/Fetch";
import { Container, Col, Row, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";

const SinglePost = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  let { slug } = useParams();
  const formatDate = (str) => {
    return moment(str).format("dddd, MMMM Do YYYY, h:mm:ss a");
  };
  useEffect(() => {
    if (slug) {
      Fetch.getPostBySlug(slug)
        .then((res) => {
          if (!res.error) {
            setPost(res);
            setLoading(false);
          } else {
            history.push("/post");
          }
        })
        .catch((err) => console.log(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Container>
      <Helmet>
        <title>{`${post ? post.title : ""} | Lifestyle Blog`}</title>
      </Helmet>
      {post && (
        <div className="post-wrapper">
          <Loader show={loading} />
          <Badge pill variant="success">
            {post.category}
          </Badge>
          <h1 className="post-title">{post.title}</h1>
          <p class="text-muted"> By: {post.author}</p>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Row>
            <Col>
              <h4>{formatDate(post.created_at)}</h4>
            </Col>
            <Col className="text-right">
              <div className="post-sharer">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  {" "}
                  <i className="fa fa-link"></i>{" "}
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  {" "}
                  <i className="fab fa-facebook fb"></i>{" "}
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  {" "}
                  <i className="fab fa-twitter tw"></i>{" "}
                </a>
                <a href="https://google.com" target="_blank" rel="noreferrer">
                  {" "}
                  <i className="fab fa-google-plus gp"></i>{" "}
                </a>
              </div>
            </Col>
          </Row>
          <div className="post-footer">
            <Row>
              <Col>
                {post.prev && (
                  <div>
                    <Link to={"/post/" + post.prev.slug}>
                      <i className="fa fa-chevron-left"></i> Preview Post
                    </Link>
                    <p>{post.prev.title}</p>
                  </div>
                )}
              </Col>
              <Col className="text-right">
                {post.next && (
                  <div>
                    <Link to={"/post/" + post.next.slug}>
                      Next Post <i className="fa fa-chevron-right "></i>
                    </Link>
                    <p>{post.next.title}</p>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SinglePost;
