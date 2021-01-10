import { Card, Badge, Row, Col } from 'react-bootstrap'

import { Link } from "react-router-dom";

const PostCard = (props) => {
    return (
        <Card className="pb-4" bg="transparent" border="light" >
            <Row>
            <Col sm={12} md={4}>
                <Card.Img src={props.post.thumbnail} className="w-100" />
            </Col>
            <Col as={Card.Body} sm={12} md={8}>
            <Badge pill variant="success">
                {props.post.category}
            </Badge>
                <Card.Title>{props.post.title}</Card.Title>
                <Card.Text>
                {props.post.description}
                </Card.Text>
                <Link to={"/post/" + props.post.slug } className="text-secondary">Read More <i className="fa fa-chevron-right"></i></Link>
            </Col>
            </Row>
        </Card>
    );
}

export default PostCard;