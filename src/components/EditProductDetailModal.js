// EditProductDetailModal.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getToday}from "../constants/functionalConstant"
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "../style/productDetailModalStyle.css";
import "../App.css";

const EditProductDetailModal = ({
  taskDetails, // Task details to be edited
  updateTask, // Function to update the task
  toggleModal,
  closeModal,
}) => {
    console.log("taskDetails:-",taskDetails);
  const [editedTask, setEditedTask] = useState({ ...taskDetails });
  console.log("editedTask:-",editedTask);

  useEffect(() => {
    setEditedTask({ ...taskDetails });
  }, [taskDetails]);

  const handleInputChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSelect = (event) => {
    setEditedTask({ ...editedTask, Priority: event.target.value });
  };

  const handleDateChange = (date) => {
    setEditedTask({ ...editedTask, Date: date });
  };

  const handleSave = () => {
    // Update the task with edited details
    updateTask(editedTask);
    closeModal();
  };

  return (
    <div>
      <ModalHeader className="modal-header-name">
        <span>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: "red", marginRight: "2px" }}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: "orange", marginRight: "2px" }}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faCircle}
            style={{ color: "green", marginRight: "100px" }}
          />
        </span>
        <span>Edit Contract Detail</span>
      </ModalHeader>
      <ModalBody>
        <div className="modal-body">
          <div>
            <FontAwesomeIcon icon="fa-sharp fa-thin fa-square" />
          </div>
          <input
            type="text"
            name="ContractTitle"
            value={editedTask.ContractTitle}
            onChange={handleInputChange}
            placeholder="Title"
            className="input-field"
          />
          <div className="pryority-div">
            <div className="data-div">Priority</div>
            <div>
              <select
                value={editedTask.Priority}
                onChange={handleSelect}
                className="select-option"
              >
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="pryority-div">
            <div className="data-div">Due</div>
            <div className="date-picker">
            <DatePicker
                selected={editedTask.Date} 
                onChange={handleDateChange} 
                minDate={getToday()}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="footer-btn">
        <Button color="btn btn-light del-btn" onClick={toggleModal}>
          Cancel
        </Button>
        <Button color="btn btn-light save-btn" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </div>
  );
};

export default EditProductDetailModal;