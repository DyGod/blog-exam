import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  const links = [
    {
      url: "https://facebook.com",
      icon: "fab fa-facebook",
    },
    {
      url: "https://twitter.com",
      icon: "fab fa-twitter",
    },
    {
      url: "https://instagram.com",
      icon: "fab fa-instagram",
    },
    {
      url: "https://pinterest.com",
      icon: "fab fa-pinterest",
    },
  ];

  return (
    <footer className="bg-primary footer">
      <Container>
        <Row>
          <Col>
            <span className="text-white">
              Copyright © 2020 –{" "}
              <a className="text-white" href="/">
                Lifestyle Blog
              </a>
            </span>
          </Col>
          <Col className="text-right">
            {links.map((item, i) => {
              return (
                <a
                  key={i}
                  href={item.url}
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              );
            })}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
