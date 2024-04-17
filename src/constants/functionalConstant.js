import axios from "axios";
export const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    return today;
  };

export const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
  
      // Update the status of destination item with specific ID in the db.json file
      axios
        .put(`http://localhost:4000/contract/${result.draggableId}`, {
          ...destItems.find((item) => item.id === result.draggableId), // Find the specific item by ID
          Status: destination.droppableId, // Update the Status property
        })
        .then((response) => {
          console.log("Destination item updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating destination item:", error);
        });
  
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // Handle the case when an item is moved within the same column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };