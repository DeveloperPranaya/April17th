import React from "react";
import { Button, Modal } from "reactstrap";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";


const CustomModal = ({
  buttonLabel,
  children,
  deleteProject,
  color,
  className,
  editProject,
  addTaskStyle,
  toggleModal,
  modalOpen

}) => {
  return (
    <div className={addTaskStyle}>
      {deleteProject ? (
        <div style={{ cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={faTrash}
            className="delete-task"
            onClick={toggleModal}
          />
        </div>
      ) : editProject ? (
        <div style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faPenToSquare} className="edit-task-btn" onClick={toggleModal}/>
        </div>
      ) : (
        <Button className={className} color={color} onClick={toggleModal}>
          {buttonLabel}
        </Button>
      )}

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="Modal-container"
      >
        {children} {/* Render the child component directly */}
      </Modal>
    </div>
  );
};

export default CustomModal;
