import { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Fetch from "./../store/Fetch";
import ErrorBag from "./ErrorBag";
import FileUploader from "./FileUploader";

import { useHistory } from "react-router-dom";

import Loader from "./Loader";

const PostForm = ({ postId }) => {
  let base_url = window.location.origin;
  let history = useHistory();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Travel");
  const [content, setContent] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Lifestyle Admin");
  const [errors, setErrors] = useState({});
  const [thumbnail, setThumnail] = useState("/images/placeholder.png");

  const changeTitle = function (e) {
    setTitle(e.target.value);
    setSlug(slugify(e.target.value));
  };

  const slugify = function (text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const submitPost = function (e) {
    e.preventDefault();
    setLoading(true);
    let payload = {
      id: postId !== "new" ? postId : 0,
      title: title,
      slug: slug,
      category: category,
      thumbnail: thumbnail,
      description: description,
      author: author,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
    };

    Fetch.storePost(payload)
      .then((res) => {
        if (res.errors) {
          setLoading(false);
          setErrors(res);
        } else {
          setLoading(false);
          setErrors({});
          history.push("/post-management");
        }
      })
      .catch((err) => setErrors(err));
  };

  useEffect(
    () => {
      if (postId !== "new") {
        Fetch.getPostById(postId)
          .then((res) => {
            if (res.error) {
              console.log("has error redirect back to post-management");
              history.push("/post-management");
            } else {
              setTitle(res.title);
              setSlug(res.slug);
              setCategory(res.category);
              setDescription(res.description);
              setAuthor(res.author);
              setThumnail(res.thumbnail);
              let cBlock = htmlToDraft(res.content);
              if (cBlock) {
                const cState = ContentState.createFromBlockArray(
                  cBlock.contentBlocks
                );
                setContent(EditorState.createWithContent(cState));
              }
              setLoading(false);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setLoading(false);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    { postId }
  );

  return (
    <Form onSubmit={submitPost}>
      <Loader show={loading} variant="primary" />
      <Row>
        <Col md={8}>
          <Form.Group>
            <Form.Label className="required">Title</Form.Label>
            <Form.Control
              placeholder="Post Title"
              value={title}
              onChange={changeTitle}
              required
            />
            <Form.Text className="text-muted">
              Slug: {base_url}
              {"/post/"}
              {slug}
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label className="required">Category</Form.Label>
            <Form.Control
              as="select"
              custom
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Travel</option>
              <option>Business</option>
              <option>Food</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} className="text-center">
          <FileUploader src={thumbnail} setSrc={setThumnail} required />
        </Col>
      </Row>

      <Form.Group>
        <Form.Label className="required">Content</Form.Label>
        <Editor
          editorState={content}
          wrapperClassName="content-editor-wrapper"
          editorClassName="content-editor"
          onEditorStateChange={(e) => setContent(e)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="required">Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="required">Author</Form.Label>
        <Form.Control
          placeholder="author"
          value={author}
          onChange={setAuthor}
          readOnly
        />
      </Form.Group>

      <div className="text-center">
        <ErrorBag errors={errors} />
        <Button variant="primary" type="submit" size="lg">
          Sumbit Post
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
