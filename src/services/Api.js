import axios from "axios";

export const URL = "http://localhost:4000/contract"




// export const fetchContracts = async (groupByOwner, setColumns) => {
//   try {
//     const response = await axios.get(URL);
//     const contractsData = response.data;

//     let groupedData = null;

//     if (groupByOwner) {
//       const data = {
//                   Open: { name: "Open", item: {} },
//                   "In Process": { name: "In Process", item: [] },
//                   Review: { name: "Review", item: {} },
//                   Complete: { name: "Complete", item: {} },
//                 };
//       // Organize contracts by owner name and then by status within each owner
//       groupedData = contractsData.reduce((acc, contract) => {
//         const owner = contract.Owner;
//         const status = contract.Status;
//       //  console.log("acc[owner][status]:-",acc[owner][status])     

//         // Ensure that acc[owner] is always an object
//         if (!acc[owner]) {
//           acc[owner] = [];
//         }

//         // Ensure that acc[owner][status] is always an array
//         if (!Array.isArray(acc[owner][status])) {
//           acc[owner][status] = [];
//         }

//         // Push the contract into the appropriate owner's status array
//         acc[owner][status].push(contract);
//         return acc;
//       }, {});
//     } else {
//       // Organize contracts by status if groupByOwner is false
//       groupedData = contractsData.reduce((acc, contract) => {
//         const status = contract.Status;
//         if (!acc[status]) {
//           acc[status] = [];
//         }
//         acc[status].push(contract);
//         return acc;
//       }, {});
//     }

//     // Convert grouped data to columns
//     const newColumns = {};
//     if (groupByOwner) {
//       for (const [owner, statuses] of Object.entries(groupedData)) {
//         const ownerItems = {};
//         for (const [status, items] of Object.entries(statuses)) {
//           ownerItems[status] = { name: status, items: items };
//         }
//         newColumns[owner] = ownerItems;
//       }
//     } else {
//       for (const [key, value] of Object.entries(groupedData)) {
//         newColumns[key] = { name: key, items: value };
//       }
//     }

//     // Set the columns state
//     setColumns(newColumns);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

export const fetchContracts = async (groupByOwner, setColumns) => {
  try {
    const response = await axios.get("http://localhost:4000/contract");
    const contractsData = response.data;

    let groupedData = null;

    if (groupByOwner) {
      // Initialize data structure with all statuses for each owner
      const data = {
        Open: { name: "Open", items: [] },
        "In Process": { name: "In Process", items: [] },
        Review: { name: "Review", items: [] },
        Complete: { name: "Complete", items: [] },
      };

      // Organize contracts by owner name and then by status within each owner
      groupedData = contractsData.reduce((acc, contract) => {
        const owner = contract.Owner;
        const status = contract.Status;

        // Ensure that acc[owner] is always an object with all statuses initialized
        if (!acc[owner]) {
          acc[owner] = { ...data };
        }

        // Ensure that acc[owner][status] is always an array
        if (!Array.isArray(acc[owner][status])) {
          acc[owner][status] = [];
        }

        // Push the contract into the appropriate owner's status array
        acc[owner][status].push(contract);
        return acc;
      }, {});
    } else {
      // Organize contracts by status if groupByOwner is false
      groupedData = contractsData.reduce((acc, contract) => {
        const status = contract.Status;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(contract);
        return acc;
      }, {});
    }

    // Convert grouped data to columns
    const newColumns = {};
    if (groupByOwner) {
      for (const [owner, statuses] of Object.entries(groupedData)) {
        const ownerItems = [];
        for (const [status, items] of Object.entries(statuses)) {
          ownerItems.push({ name: status, items: items });
        }
        newColumns[owner] = { name: owner, items: ownerItems };
      }
    } else {
      for (const [key, value] of Object.entries(groupedData)) {
        newColumns[key] = { name: key, items: value };
      }
    }

    // Set the columns state
    setColumns(newColumns);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};







  export const createNewData = (columnId, newTaskContent, selectedOption, setColumns, toast) => {
    const newTask = {
      id: String(Date.now()),
      ContractTitle: newTaskContent.content,
      Priority: selectedOption,
      Status: "Open",
    };

    // Append the new task to the end of the items array in the respective column
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        items: [...prevColumns[columnId].items, newTask],
      },
    }));

    // Adjust the POST request URL to target the correct endpoint
    axios
      .post(URL, newTask)
      .then((response) => {
        const notify1 = () => toast("Sucessfully Created contract");
        // Handle response if needed
      })
      .catch((error) => {
        console.error("Error adding new task:", error);
      });
  };

  export const deleteTask = (taskId, columnId, setColumns) => {
    // Remove the task with the specified taskId from the items array in the respective column
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        items: prevColumns[columnId].items.filter((task) => task.id !== taskId),
      },
    }));
  
    // Send a DELETE request to remove the task from the server
    axios
      .delete(`http://localhost:4000/contract/${taskId}`)
      .then((response) => {
        // Handle response if needed
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

 export  const updateTask = (updatedTask, columns, setColumns) => {
    // Find the column containing the updated task
    const columnId = Object.keys(columns).find((key) =>
      columns[key].items.some((item) => item.id === updatedTask.id)
    );
  
    // Update the task within the respective column
    const updatedColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: columns[columnId].items.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        ),
      },
    };
  
    // Send a PUT request to update the task on the server
    axios
      .put(`http://localhost:4000/contract/${updatedTask.id}`, updatedTask)
      .then((response) => {
        console.log("Task updated successfully:", response.data);
        // Update the state with the updated columns
        setColumns(updatedColumns);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };
  
  
