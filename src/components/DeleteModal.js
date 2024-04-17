import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteModal = ({
    deleteTask,
    id,
    columId,
    toggle,
    taskDetails
}) => {
 
  return (
    <div>
      <ModalBody style={{color:"red", fontWeight: 700}}>
        Do You Want to Delete {taskDetails.ContractTitle}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="danger" onClick={()=> deleteTask(id, columId)}>
          Delete
        </Button>
      </ModalFooter>
    
    </div>
  );
};

export default DeleteModal;