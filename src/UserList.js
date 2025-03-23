import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import axios from "axios";
import EditUser from './EditUser';



const paginationModel = { page: 0, pageSize: 5 };

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
useEffect(() => {
    axios.get("http://localhost:2000/api/user") 
      .then((response) => {
        const usersWithId = response.data.map((user, index) => ({
          id: user._id || index, 
          ...user
        }));
        setUsers(usersWithId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
//   useEffect(() => {
//     console.log("Updated students:", users);
// }, [users]); 


const handleDelete = (id) => {
  console.log("Editing user:", id);
  axios.delete("http://localhost:2000/api/user", {
    data: { _id: id }  
  }) 
    .then((response) => {
      console.log(`user with id ${id} deleted`);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

const handleEdit = (id) => {
console.log("Editing user:", id);
setEdit(true);   
}


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'username', headerName: 'User name', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'mail', headerName: 'Email', width: 130 },
  { 
    field: 'Edit ', 
    headerName: '', 
    width: 130,
    sortable: false,
    renderCell: (params) => (
        <Button aria-label="edit"
        onClick={() => handleEdit(params.row.id)}>
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
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <EditUser props={edit}></EditUser>
    </Paper>

  );
}