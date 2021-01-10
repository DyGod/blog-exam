import { Modal, Button } from "react-bootstrap";


const ConfirmModal = ({show, handleClose, handleConfirm, title, description}) => {
    
    return (<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirm}>Yes</Button>
        </Modal.Footer>
    </Modal>);
}



export default ConfirmModal;