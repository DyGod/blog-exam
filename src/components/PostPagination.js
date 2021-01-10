import { Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";

const PostPagination = (props) => {
  const [items, setItems] = useState([]);

  const jumpTo = (page) => {
    props.setFilter({
      current: page,
      perPage: props.filter.perPage,
      total: props.filter.total,
    });
  };

  useEffect(() => {
    let paginationItems = [];
    let pages = Math.ceil(props.filter.total / props.filter.perPage);
    for (let x = 1; x <= pages; x++) {
      paginationItems.push(
        <Pagination.Item
          key={x}
          active={x === props.filter.current}
          onClick={() => jumpTo(x)}
        >
          {x}
        </Pagination.Item>
      );
    }

    setItems(paginationItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filter]);

  return (
    <Row className="table-pagination">
      <Col md={10}>
        <Pagination>
          {props.filter.current > 1 && (
            <Pagination.Prev onClick={() => jumpTo(props.filter.current - 1)} />
          )}
          {items}
          {props.filter.current < items.length && (
            <Pagination.Next onClick={() => jumpTo(props.filter.current + 1)} />
          )}
        </Pagination>
      </Col>
      <Col md={2} className="text-center pr-5">
        {props.filter.total} Total Posts
      </Col>
    </Row>
  );
};

export default PostPagination;
