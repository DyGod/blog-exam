import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import Fetch from "./../store/Fetch";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import PostPagination from "./PostPagination";
import Loader from "./Loader";

import moment from "moment";

const PostTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Filter Form
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("created_at,desc");

  const submitFilter = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  // Pagination
  const [pageFilter, setPageFilter] = useState({
    total: 0,
    current: 1,
    perPage: 10,
  });

  const jumpTo = (data) => {
    setPageFilter(data);
    setLoading(true);
  };

  const formatDate = (str) => {
    return moment(str).format("MMM D YYYY h:mm:ss a");
  };

  // Delete Post Functions and Data
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const closeDelete = () => setShowDelete(false);
  const handleShowDelete = (post) => {
    setSelectedPost(post);
    setShowDelete(true);
  };
  const confirmDelete = () => {
    Fetch.deletePost(selectedPost.id)
      .then((res) => {
        alert("successfully Delete Post");
        setLoading(true);
        closeDelete();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loading) {
      let filter = {
        q: q,
        category: category,
        sort: sort,
        current: pageFilter.current,
        perPage: 10,
      };
      Fetch.getPosts(filter)
        .then((res) => {
          setLoading(false);
          setPageFilter(res.pageFilter);
          setPosts(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    return () => {
      setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className="position-relative">
      <Loader show={loading} />
      <div className="table-filter">
        <Form onSubmit={submitFilter}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  placeholder="Title"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Filter Category</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option>Travel</option>
                  <option>Business</option>
                  <option>Food</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="created_at,desc">Created Date DESC</option>
                  <option value="created_at,asc">Created Date ASC</option>
                  <option value="title,desc">Title DESC</option>
                  <option value="title,asc">Title ASC</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <div className="clear">Set Filter</div>
                <Button variant="primary" type="submit">
                  Set Filter
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p, i) => {
            return (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>
                  <div>Last Modified: {formatDate(p.updated_at)} </div>
                </td>
                <td>
                  <img src={p.thumbnail} alt="" height="75" width="75" />
                </td>
                <td>
                  <Button
                    as={Link}
                    to={"/post/" + p.slug}
                    variant="outline-success"
                    className="mr-2"
                    size="sm"
                  >
                    {" "}
                    <i className="fa fa-eye"></i> View
                  </Button>
                  <Button
                    as={Link}
                    to={"/post-management/" + p.id}
                    variant="outline-info"
                    className="mr-2"
                    size="sm"
                  >
                    {" "}
                    <i className="fa fa-edit"></i> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleShowDelete(p)}
                  >
                    {" "}
                    <i className="fa fa-trash"></i> Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <PostPagination filter={pageFilter} setFilter={jumpTo} />

      <ConfirmModal
        show={showDelete}
        handleClose={closeDelete}
        handleConfirm={confirmDelete}
        title="Delete Post"
        description={"Are you sure? Delete post: " + selectedPost.title}
      />
    </div>
  );
};

export default PostTable;
