import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from './AppThem';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function EditUser({ user,setUser, onClose }) {
  const [name, setName] = useState(user?.name || '');
  const [username, setUserName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
  }, [user]);

  const validateInputs = () => {
    let isValid = true;

    if (!phone || phone.length < 8) {
      setPhoneError(true);
      setPhoneErrorMessage('Phone must be at least 8 numbers long.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }
    if (!username || username.length < 1) {
      setUserNameError(true);
      setUserNameErrorMessage('User Name is required.');
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }
    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return; 
    }

    const formData = new FormData(event.currentTarget);
    const updatedUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      username:formData.get('username'),
      _id:user._id
    };
    axios.put("http://localhost:2000/api/user",  updatedUser)  
    .then(() => {
      setUser(prevUsers => prevUsers.map(u => u._id === user._id ? updatedUser : u));
      onClose?.();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

    console.log('Updated user:', updatedUser);
    onClose?.(); 
  };

  return (
    <AppTheme {...user}>
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', padding: 2 }}>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Edit User {user?.name}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameErrorMessage}
              />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="username">User Name</FormLabel>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                error={userNameError}
                helperText={userNameErrorMessage}
              />
              </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                
                fullWidth
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <TextField
                required
                fullWidth
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                helperText={phoneErrorMessage}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Edit User
            </Button>
          </Box>
        </Card>
      </Stack>
    </AppTheme>
  );
}
