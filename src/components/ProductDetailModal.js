import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {getToday}from "../constants/functionalConstant";
import { ToastContainer, toast } from 'react-toastify';
import "../style/productDetailModalStyle.css";
import "../App.css";

const ProductDetailModal = ({
  newTaskContent,
  handleInputChange,
  handleSelect,
  selectedOption,
  createNewData,
  toggleModal,
  closeModal,
}) => {
 
  const [startDate, setStartDate] = useState(new Date());
  const [isInputValid, setIsInputValid] = useState(true);
  const [isDropdownValid, setIsDropdownValid] = useState(true);
  const notify = () => toast("Wow so easy!");

  console.log("startDate:-",startDate);

  const handleSave = () => {
    // Check if the input field is not empty
    if (newTaskContent.content.trim() === "") {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }

    // Check if an option is selected from the dropdown
    if (selectedOption === "") {
      setIsDropdownValid(false);
    } else {
      setIsDropdownValid(true);
    }

    // Proceed with saving if both input and dropdown are valid
    if (newTaskContent.content.trim() !== "" && selectedOption !== "") {
      createNewData("Open");
      notify();
      closeModal();
      setStartDate();
      setIsInputValid();
      setIsDropdownValid();
      // startDate();
      // isDropdownValid();
    }
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
            style={{ color: "green", marginRight: "90px" }}
          />
        </span>
        <span>Create New Contract</span>
      </ModalHeader>
      <ModalBody>
        <div className="modal-body">
          <div>
            <FontAwesomeIcon icon="fa-sharp fa-thin fa-square" />
          </div>
          <input
            type="text"
            value={newTaskContent.content}
            onChange={handleInputChange}
            placeholder="Title"
            className={isInputValid ? "" : "invalid-input"}
          />
          {!isInputValid && (
            <div className="error-message">Title cannot be empty</div>
          )}
          <div className="description-tital">Add details</div>
          <div className="pryority-div">
            <div className="data-div">Pryority</div>
            <div>
              <select
                value={selectedOption}
                onChange={handleSelect}
                className={isDropdownValid ? "select-option" : "select-option invalid-dropdown"}
              >
                <option value="">Select an option</option>
                <option value="Medium">
                  Medium
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: "red", marginRight: "2px" }}
                  />
                </option>
                <option value="High">
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: "red", marginRight: "2px" }}
                  />
                  High
                </option>
                <option value="Low">
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{ color: "green", marginRight: "2px" }}
                  />
                  Low
                </option>
              </select>
              {!isDropdownValid && (
                <div className="error-message">Please select a priority</div>
              )}
            </div>
          </div>
          <div className="pryority-div">
            <div className="data-div">Due</div>
            <div className="date-picker">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={getToday()}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="footer-btn">
        <Button color="btn btn-light del-btn" onClick={toggleModal}>
          Delete
        </Button>
        <div>
          <Button color="btn btn-light" onClick={closeModal} data-dismiss="modal" toggle={toggleModal}>
            Cancel
          </Button>
          <Button
            color="btn btn-light save-btn"
            onClick={handleSave}
          >
            Save
          </Button>
          <ToastContainer />
        </div>
      </ModalFooter>
    </div>
  );
};

export default ProductDetailModal;
