import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import EditTask from './EditTask';
import AddTask from './AddTask';

const paginationModel = { page: 0, pageSize: 5 };

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    useEffect(() => {
      axios.get("http://localhost:2000/api/task")
        .then((response) => {
          const tasksWithId = response.data.map((task) => ({
            id: task._id,
            ...task
          }));
          setTasks(tasksWithId);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    
  useEffect(() => {
    console.log("Updated task:", tasks);
}, [tasks]); 


const handleDelete = (id) => {
  console.log("Editing task:", id);
  axios.delete("http://localhost:2000/api/task", {
    data: { _id: id }  
  }) 
    .then((response) => {
      console.log(`user with id ${id} deleted`);
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
const handleAdd=()=>{
  setAdd(true)
}
const handleEdit = (task) => {
console.log("Editing task:", task.name);
setEdit(true); 
setSelectedTask(task)  
}

const handleEditComplete= (task) => {
  console.log("Editing task:", task.name);
  setEdit(true); 
  setSelectedTask(task)  
}

if (edit) {
  return <EditTask task={selectedTask} setTasks={setTasks} onClose={() => setEdit(false)} />;
}
if (add) {
  return <AddTask setTasks={setTasks} onClose={() => setAdd(false)} />;
}
const columns = [
 
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'tags', headerName: 'Tags', width: 130 },
  { 
    field: 'Complete ', 
    headerName: '', 
    width: 130,
    sortable: false,
    renderCell: (params) => (
        <Checkbox defaultChecked  onClick={() => handleEditComplete(params.row)}/>
    )
  },
  { 
    field: 'Edit ', 
    headerName: '', 
    width: 130,
    sortable: false,
    renderCell: (params) => (
        <Button aria-label="edit"
        onClick={() => handleEdit(params.row)}>
       ✏️
      </Button>
    )
  },
  { 
    field: 'Delete', 
    headerName: '', 
    width: 130,
    sortable: false,
    renderCell: (params) => (
        <IconButton aria-label="delete"
        onClick={() => handleDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    )
  }
 
];
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="success"onClick={()=>handleAdd()}>
Add New Task

</Button>
      <DataGrid
        rows={tasks}
        getRowId={(row) => row._id|| row.id || Math.random() }
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
     
    </Paper>

  );
}