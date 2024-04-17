import React from "react";
import { Draggable } from "react-beautiful-dnd";
import CustomModal from "./CommonModal";
import EditProductDetailModal from "./EditProductDetailModal";
import DeleteModal from "./DeleteModal"
import { updateTask } from "../services/Api";
import "../style/draggableItemStyle.css"


const DraggableItem = ({
  item,
  index,
  snapshot,
  provided,
  toggleEditModal,
  editTaskId,
  modalEditDetailOpen,
  toggleDeleteModal,
  deleteModalOpen,
  deleteTaskId,
  setColumns,
  columns,
  closeModal,
//   updateTask,
  userImage,
  columnId,
  closeDeleteModal,
  deleteTask,
  showType,
  priority,
  showCreatedBy,
  showCreatedDate,
  modifiedBy,
  modifiedDate,
  tags,
  handleInputChange,
  handleSelect,
  selectedOption,
  closeEditModal,
}) => {
  {console.log("item:-",item)}
   

  return (
    <Draggable
      key={String(item.id)}
      draggableId={String(item.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            item.Priority === "Medium"
              ? "border-medium_pry"
              : item.Priority === "High"
              ? "border-high-pry"
              : "border-low-pry"
          }
          style={{
            userSelect: "none",
            width: "90%",
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 10,
            margin: "8px 20px 8px",
            minHeight: "50px",
            backgroundColor: snapshot.isDragging ? "#263B4A" : "white",
            color: "black",
            ...provided.draggableProps.style,
          }}
        >
          {showType && (
            <div className="created-by">
              <div>Type: </div>
              <div className="Created-name">{item.Type}</div>
            </div>
          )}
          <div className="project-container">
            <div className="project-description" data-bs-custom-class="custom-tooltip" data-toggle="tooltip" data-placement="top" title={item.ContractTitle}>{item.ContractTitle}</div>

            <div className="user-image-container">
              <img src={userImage} alt="Task" className="image-container" />
              <div className="owner-name" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right" title={item.Owner} >{item.Owner}</div>
            </div>
          </div>

          {priority && (
            <div className="project-container class-font-size">
              <div className="project-Pryority">Pryority</div>
              <div>
                <div
                  className={
                    item.Priority === "Medium"
                      ? "Medium_pry pry"
                      : item.Priority === "High"
                      ? "high-pry pry"
                      : "low-pry pry"
                  }
                >
                  {item.Priority}
                </div>
              </div>
            </div>
          )}
          {showCreatedBy && (
            <div className="created-by class-font-size">
              <div>Created by: </div>
              <div className="creator-name">{item.CreatedBy}</div>
            </div>
          )}

          {showCreatedDate && (
            <div className="created-by class-font-size">
              <div>Created Date: </div>
              <div className="creator-name">{item.CreatedDate}</div>
            </div>
          )}

          {modifiedBy && (
            <div className="created-by class-font-size">
              <div>Modified by: </div>
              <div className="creator-name">{item.ModifiedBy}</div>
            </div>
          )}

          {modifiedDate && (
            <div className="created-by class-font-size">
              <div>Modified Date: </div>
              <div className="creator-name">{item.ModifiedDate}</div>
            </div>
          )}

          {tags && (
            <div className="created-by class-font-size">
              <div>Tags: </div>
              <div className="creator-name">{item.Tags}</div>
            </div>
          )}

          <div className="details-class class-font-size">
            <div>No details</div>
            <div className="details-task-btn">
              <CustomModal
                buttonLabel="Edit"
                className="btn-class"
                editProject
                toggleModal={() => toggleEditModal(item.id)} // Pass task ID to toggle function
                modalOpen={modalEditDetailOpen && editTaskId === item.id} // Show modal for specific task ID
                key={item.id} // Add key to avoid reusing modals
              >
                <EditProductDetailModal
                  updateTask={(updatedTask) =>
                    updateTask(updatedTask, columns, setColumns)
                  }
                  taskDetails={item}
                  handleInputChange={handleInputChange}
                  handleSelect={handleSelect}
                  selectedOption={selectedOption}
                  closeModal={closeEditModal}
                  toggleModal={() => toggleEditModal(item.id)} // Pass task ID to toggle function
                />
              </CustomModal>

              <CustomModal
                buttonLabel="Delete"
                className="btn-class"
                deleteProject
                toggleModal={() => toggleDeleteModal(item.id)} // Pass task ID to toggle function
                modalOpen={deleteModalOpen && deleteTaskId === item.id} // Show modal for specific task ID
                key={item.id} // Add key to avoid reusing modals
              >
                 <DeleteModal
                  deleteTask={(taskId, columnId) =>
                    deleteTask(taskId, columnId, setColumns)
                  }
                  id={item.id}
                  columId={columnId}
                  closeModal={closeDeleteModal}
                  toggle={() => toggleDeleteModal(item.id)}
                  taskDetails={item}
                /> 
              </CustomModal>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
