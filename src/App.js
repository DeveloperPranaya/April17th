import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import HeadNav from "./components/HeadNav";
import userImage from "./images/useImage.png";
import CustomModal from "./components/CommonModal";
import DeleteModal from "./components/DeleteModal";
import EditProductDetailModal from "./components/EditProductDetailModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailModal from "./components/ProductDetailModal";
import {
  fetchContracts,
  createNewData,
  updateTask,
  deleteTask,
} from "./services/Api";
import { onDragEnd } from "./constants/functionalConstant";
import DraggableItem from "./components/DragggableItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown,faCaretUp} from "@fortawesome/free-solid-svg-icons";
import "./style/globalStyle.css";
import "./applicationStyle.css";
import "./App.css";

function App() {
  const [columns, setColumns] = useState({
    Open: { name: "Open", items: [] },
    "In Process": { name: "In Process", items: [] },
    Review: { name: "Review", items: [] },
    Complete: { name: "Complete", items: [] },
  });
  console.log("columns:-", columns);
  const [groupByOwner, setGroupByOwner] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showCreatedBy, setShowCreatedBy] = useState(false);
  const [showCreatedDate, setShowCreatedDate] = useState(false);
  const [modifiedBy, setModifiedBy] = useState(false);
  const [modifiedDate, setModifiedDate] = useState(false);
  const [priority, setPriority] = useState(false);
  const [tags, setTags] = useState(false);
  const [modalProductDetailOpen, setModalProductDetailOpen] = useState(false);
  const [modalEditDetailOpen, setModalEditDetailOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState({
    content: "",
    pryority: "",
    date: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [showOwnerDetails, setShowOwnerDetails] = useState(false);

  const handleShowOwnerData = (owner) =>{
    setOwnerName(owner);
    if(owner === ownerName){
      setShowOwnerDetails(!showOwnerDetails)
    }
  }
  const onChangeGroupByOwner = () => {
    setGroupByOwner(!groupByOwner);
  };

  const onChangeCreatedBy = () => {
    setShowCreatedBy(!showCreatedBy);
  };

  const onChangeCreatedDate = () => {
    setShowCreatedDate(!showCreatedDate);
  };

  const onChangeMOdifiedBy = () => {
    setModifiedBy(!modifiedBy);
  };

  const onChangeMOdifiedDate = () => {
    setModifiedDate(!modifiedDate);
  };

  const onChangePriority = () => {
    setPriority(!priority);
  };

  const onChangeType = () => {
    setShowType(!showType);
  };

  const onChangeTages = () => {
    setTags(!tags);
  };

  const handleInputChange = (e) => {
    setNewTaskContent({ ...newTaskContent, content: e.target.value });
  };

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to toggle delete modal and set the task ID
  const toggleDeleteModal = (taskId) => {
    setDeleteTaskId(taskId);
    setDeleteModalOpen(!deleteModalOpen);
  };

  // Function to close delete modal and clear the task ID
  const closeDeleteModal = () => {
    setDeleteTaskId(null);
    setDeleteModalOpen(false);
  };

  const toggleEditModal = (taskId) => {
    setEditTaskId(taskId);
    setModalEditDetailOpen(!modalEditDetailOpen);
  };

  const closeEditModal = () => {
    setEditTaskId(null);
    setModalEditDetailOpen(false);
  };

  const toggleModal = () => {
    setModalProductDetailOpen(!modalProductDetailOpen);
  };

  const closeModal = () => {
    setModalProductDetailOpen(false);
  };

  const handleClickOwner = (owner) =>{
    console.log("owner:-",owner)
  }

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchContracts(groupByOwner, setColumns);
  }, [groupByOwner]);

  return (
    <>
      <HeadNav
        onChangeType={onChangeType}
        onChangeCreatedBy={onChangeCreatedBy}
        onChangeCreatedDate={onChangeCreatedDate}
        onChangeMOdifiedBy={onChangeMOdifiedBy}
        onChangeMOdifiedDate={onChangeMOdifiedDate}
        onChangePriority={onChangePriority}
        onChangeTages={onChangeTages}
        onChangeGroupByOwner={onChangeGroupByOwner}
      />

      <div className="card-1 card">
        <div>
         <div className={groupByOwner? "status-name-container-groupby":"status-name-container"}>
            <div className="status-heder" style={{background: "orange"}}>Open</div>
            <div className="status-heder" style={{background: "#0487E2"}}>In Process</div>
            <div className="status-heder" style={{background: "#7851A9"}}>Review</div>
            <div className="status-heder"  style={{background: "#3CB043"}}>Complete</div>
          </div>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {groupByOwner ? (
              <div>
                {Object.entries(columns).map(([owner, statuses], key) => (
                 
                  <div key={key}>
                   <div className="flex-center-div">
                    <div className="drop-down-Icon" onClick={()=>handleShowOwnerData(owner)}>
                      {owner === ownerName && showOwnerDetails?<FontAwesomeIcon icon={faCaretUp}
                      />:<FontAwesomeIcon icon={faCaretDown} />}</div>
                     <p className="status-position">Owner: {owner}</p>
                    </div> 
                    {owner === ownerName && showOwnerDetails ? '' 
                    :
                    <div
                      style={{
                        display: "grid",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)", // Four columns with equal width
                        gap: 4,
                      }}
                    >
                      {statuses.items.map((item, index) => {
                        // Check if columnId is not "name"
                        return (
                          <div key={index}>
                            <Droppable droppableId={item.name} key={item.name}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                      background: snapshot.isDraggingOver
                                        ? "lightblue"
                                        : "#ebeaea",
                                      padding: "20px 1px 10px",
                                      width: "100%",
                                      minHeight: 500,
                                      maxHeight: "100%",
                                    }}
                                  >
                                    {item.items &&
                                      Object.entries(item.items).map(
                                        ([key, value], index) => {
                                          return (
                                            <div>
                                              {Object.keys(value).length > 0 &&
                                                typeof value !== "string" && (
                                                  <DraggableItem
                                                    item={value}
                                                    index={index}
                                                    userImage={userImage}
                                                    toggleDeleteModal={
                                                      toggleDeleteModal
                                                    }
                                                    // columnId={columnId}
                                                    closeDeleteModal={
                                                      closeDeleteModal
                                                    }
                                                    deleteTask={deleteTask}
                                                    showType={showType}
                                                    priority={priority}
                                                    showCreatedBy={
                                                      showCreatedBy
                                                    }
                                                    showCreatedDate={
                                                      showCreatedDate
                                                    }
                                                    modifiedBy={modifiedBy}
                                                    modifiedDate={modifiedDate}
                                                    tags={tags}
                                                    deleteModalOpen={
                                                      deleteModalOpen
                                                    }
                                                    deleteTaskId={deleteTaskId}
                                                    setColumns={setColumns}
                                                    toggleEditModal={
                                                      toggleEditModal
                                                    }
                                                    modalEditDetailOpen={
                                                      modalEditDetailOpen
                                                    }
                                                    editTaskId={editTaskId}
                                                    updateTask={updateTask}
                                                    columns={columns}
                                                    closeEditModal={
                                                      closeEditModal
                                                    }
                                                  />
                                                )}
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                );
                              }}
                            </Droppable>
                          </div>
                        );
                      })}
                    </div>
                    }
                  </div>
                ))}
              </div>
            ) : (
              < div style={{
                display: "grid",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // Four columns with equal width
                gap:4,
              }}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div key={columnId}  >
                      {/* <h2 className="sticky-header">{column.name}</h2> */}
                      <div>
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "#ebeaea",
                                  padding: "20px 1px 10px",
                                  width: "100%",
                                  minHeight: 500,
                                  maxHeight: "100%",
                                }}
                              >
                                {column.items.length > 0
                                  ? column.items.map((item, index) => {
                                      return (
                                        // added
                                        // Conditionally render Draggable based on column name
                                        // column.name !== "Complete" ? (
                                          <DraggableItem
                                            item={item}
                                            index={index}
                                            userImage={userImage}
                                            toggleDeleteModal={
                                              toggleDeleteModal
                                            }
                                            columnId={columnId}
                                            closeDeleteModal={closeDeleteModal}
                                            deleteTask={deleteTask}
                                            showType={showType}
                                            priority={priority}
                                            showCreatedBy={showCreatedBy}
                                            showCreatedDate={showCreatedDate}
                                            modifiedBy={modifiedBy}
                                            modifiedDate={modifiedDate}
                                            tags={tags}
                                            deleteModalOpen={deleteModalOpen}
                                            deleteTaskId={deleteTaskId}
                                            setColumns={setColumns}
                                            toggleEditModal={toggleEditModal}
                                            modalEditDetailOpen={
                                              modalEditDetailOpen
                                            }
                                            editTaskId={editTaskId}
                                            updateTask={updateTask}
                                            columns={columns}
                                            closeEditModal={closeEditModal}
                                          />
                                        // ) : (
                                        //   <div
                                        //     key={String(item.id)}
                                        //     className={
                                        //       item.Priority === "Medium"
                                        //         ? "border-medium_pry"
                                        //         : item.Priority === "High"
                                        //         ? "border-high-pry"
                                        //         : "border-low-pry"
                                        //     }
                                        //     style={{
                                        //       userSelect: "none",
                                        //       width: "90%",
                                        //       paddingRight: 10,
                                        //       paddingLeft: 10,
                                        //       paddingBottom: 10,
                                        //       margin: "8px 20px 8px",
                                        //       minHeight: "50px",
                                        //       backgroundColor: "white",
                                        //       color: "black",
                                        //     }}
                                        //   >
                                        //     <div className="project-container">
                                        //       <div className="project-description">
                                        //         {item.ContractTitle}
                                        //       </div>

                                        //       <div>
                                        //         <img
                                        //           src={userImage}
                                        //           alt="Task"
                                        //           className="image-container"
                                        //         />
                                        //       </div>
                                        //     </div>

                                        //     <div className="project-container">
                                        //       <div className="project-Pryority">
                                        //         Pryority
                                        //       </div>
                                        //       <div>
                                        //         <div
                                        //           className={
                                        //             item.Priority === "Medium"
                                        //               ? "Medium_pry pry"
                                        //               : item.Priority === "High"
                                        //               ? "high-pry pry"
                                        //               : "low-pry pry"
                                        //           }
                                        //         >
                                        //           {item.Priority}
                                        //         </div>
                                        //       </div>
                                        //     </div>

                                        //     <div className="details-class">
                                        //       <div>No details</div>
                                        //       <div className="details-task-btn">
                                        //         <CustomModal
                                        //           buttonLabel="Edit"
                                        //           className="btn-class"
                                        //           editProject
                                        //           toggleModal={() =>
                                        //             toggleEditModal(item.id)
                                        //           } // Pass task ID to toggle function
                                        //           modalOpen={
                                        //             modalEditDetailOpen &&
                                        //             editTaskId === item.id
                                        //           } // Show modal for specific task ID
                                        //           key={item.id} // Add key to avoid reusing modals
                                        //         >
                                        //           <EditProductDetailModal
                                        //             updateTask={(updatedTask) =>
                                        //               updateTask(
                                        //                 updatedTask,
                                        //                 columns,
                                        //                 setColumns
                                        //               )
                                        //             }
                                        //             taskDetails={item}
                                        //             handleInputChange={
                                        //               handleInputChange
                                        //             }
                                        //             handleSelect={handleSelect}
                                        //             selectedOption={
                                        //               selectedOption
                                        //             }
                                        //             // createNewData={
                                        //             //   createNewData
                                        //             // }
                                        //             closeModal={closeEditModal}
                                        //             toggleModal={() =>
                                        //               toggleEditModal(item.id)
                                        //             } // Pass task ID to toggle function
                                        //           />
                                        //         </CustomModal>

                                        //         <CustomModal
                                        //           buttonLabel="Delete"
                                        //           className="btn-class"
                                        //           deleteProject
                                        //           toggleModal={() =>
                                        //             toggleDeleteModal(item.id)
                                        //           } // Pass task ID to toggle function
                                        //           modalOpen={
                                        //             deleteModalOpen &&
                                        //             deleteTaskId === item.id
                                        //           } // Show modal for specific task ID
                                        //           key={item.id} // Add key to avoid reusing modals
                                        //         >
                                        //           <DeleteModal
                                        //             deleteTask={(
                                        //               taskId,
                                        //               columnId
                                        //             ) =>
                                        //               deleteTask(
                                        //                 taskId,
                                        //                 columnId,
                                        //                 setColumns
                                        //               )
                                        //             }
                                        //             id={item.id}
                                        //             columId={columnId}
                                        //             closeModal={
                                        //               closeDeleteModal
                                        //             }
                                        //             toggle={() =>
                                        //               toggleDeleteModal(item.id)
                                        //             }
                                        //             taskDetails={item}
                                        //           />
                                        //         </CustomModal>
                                        //       </div>
                                        //     </div>
                                        //   </div>
                                        // )
                                      );
                                    })
                                  : ""}

                                {/* Add Task button */}
                                <CustomModal
                                  buttonLabel="Add Task"
                                  className="btn-class btn-add-contract"
                                  addTaskStyle="btn-pr-detail"
                                  toggleModal={toggleModal}
                                  modalOpen={modalProductDetailOpen}
                                >
                                  <ProductDetailModal
                                    newTaskContent={newTaskContent}
                                    handleInputChange={handleInputChange}
                                    handleSelect={handleSelect}
                                    selectedOption={selectedOption}
                                    createNewData={(columnId) =>
                                      createNewData(
                                        columnId,
                                        newTaskContent,
                                        selectedOption,
                                        setColumns,
                                        toast
                                      )
                                    }
                                    closeModal={closeModal}
                                    toggleModal={toggleModal}
                                  />
                                </CustomModal>
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default App;
