import { Spinner } from "react-bootstrap";

const Loader = ({ show }) => {
  return (
    <div className={"loader " + (show ? "visible" : "invisible")}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
