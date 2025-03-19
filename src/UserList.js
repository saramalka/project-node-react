import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import axios from "axios";

const handleEdit = (user) => {
    console.log("Editing user:", user);
    alert(`עריכת משתמש: ${user.name}`);
  };

const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'username', headerName: 'User name', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'mail', headerName: 'Email', width: 130 },
  { 
    field: ' ', 
    headerName: '', 
    width: 130,
    sortable: false,
    renderCell: (params) => (
        <IconButton aria-label="delete"
        onClick={() => handleEdit(params.row)}>
        <DeleteIcon />
      </IconButton>
  
     
    )
  }
 
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UserList() {
    const [users, setUsers] = useState([]);
useEffect(() => {
    axios.get("http://localhost:2000/api/user") 
      .then((response) => {
        const usersWithId = response.data.map((user, index) => ({
          id: user.id || index, 
          ...user
        }));
        setUsers(usersWithId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("Updated students:", users);
}, [users]); 

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
    </Paper>
  );
}