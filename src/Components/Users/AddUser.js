import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../AppThem';
import axios from 'axios';

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
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function EditUser({setUser,  onClose }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [userNameError, setUserNameError] = React.useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = React.useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');   
  const [email, setEmail] = useState('');  
  const [phone, setPhone] = useState('');  

const validateInputs = () => {
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!phone.value || phone.value.length < 8) {
      setPhoneError(true);
      setPhoneErrorMessage('Phone must be at least 8 numbers long.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    if (!username.value || username.value.length < 1) {
        setUserNameError(true);
        setUserNameErrorMessage('User Name is required.');
        isValid = false;
      } else {
        setUserNameError(false);
        setUserNameErrorMessage('');
      }
    if (!name.value || name.value.length < 1) {
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
    if (nameError||userNameError || emailError || phoneError) {
      
      return;
    }
    const data = new FormData(event.currentTarget);
    
  
  const addUser = {
    name: data.get('name'),
    username: data.get('username'),
    email: data.get('email'),
    phone: data.get('phone')
  };
     axios.post("http://localhost:2000/api/user",  addUser) 
     .then((response) => {
      const addedUser = response.data;
      
      handleAddUserSuccess(addedUser);
        onClose?.();
      }) 
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    
        console.log('Add user:', addUser);
        onClose?.(); 
  };
  const handleAddUserSuccess = (newUser) => {
    setUser(prevUsers => [...prevUsers, { id: newUser._id, ...newUser }]);
  }
  return (
    <AppTheme >
      {/* <CssBaseline enableColorScheme /> */}
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
           Add New User 
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder={name}
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">User name</FormLabel>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder={username}
                error={userNameError}
                helperText={userNameErrorMessage}
                color={userNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder={email}
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={phoneError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <TextField
                required
                fullWidth
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="string"
                id="phone"
                autoComplete="new-phone"
                variant="outlined"
                error={phoneError}
                helperText={phoneErrorMessage}
                color={phoneError ? 'error' : 'primary'}
              />
            </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Add User
            </Button>
          </Box>
         
          
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}