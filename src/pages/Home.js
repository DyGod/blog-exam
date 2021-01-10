import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";

import PostCard from "../components/PostCard";
import Slider from "./../components/Slider";

import Fetch from "./../store/Fetch";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (loading) {
      let filter = {
        sort: "created_at,desc",
        current: 1,
        perPage: 6,
      };
      Fetch.getPosts(filter).then((res) => {
        setRecentPosts(res.data);
        setLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const slides = [
    {
      src: "/images/slide1.jpg",
      caption: "Coffee is Life",
    },
    {
      src: "/images/slide2.jpg",
      caption: "Veni Vidi Vici",
    },
    {
      src: "/images/slide3.jpg",
      caption: "Just Do It!",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Home | Lifestyle Blog</title>
      </Helmet>
      <Container>
        <Slider slides={slides} />

        <section className="recent-posts my-4">
          <h2>Recent Posts</h2>

          <Row>
            {recentPosts.map((item, i) => {
              return (
                <Col key={i} sm={12} md={6}>
                  {" "}
                  <PostCard post={item} />{" "}
                </Col>
              );
            })}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Home;
