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

export default function AddTask({setTasks,  onClose }) {
 
    const [titleErrorMessage, setTitleErrorMessage] = React.useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [tags, setTags] = useState('');   
  const [complete, setComplete] = useState(false);  
  

const validateInputs = () => {
    const title = document.getElementById('title');
    const tags = document.getElementById('tags');
    const complete = document.getElementById('complete');
   
    let isValid = true

    if (!title.value || title.value.length < 1) {
      setTitleError(true);
      setTitleErrorMessage('Title is required.');
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage('');
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (titleError) {
      
      return;
    }
    const data = new FormData(event.currentTarget);
    
  
  const addTask = {
    title: data.get('title'),
    complete: data.get('complete'),
    tags: data.get('tags'),
   
  };
     axios.post("http://localhost:2000/api/task",  addTask) 
     .then((response) => {
      const addTask = response.data;
      
      handleAddTaskSuccess(addTask);
        onClose?.();
      }) 
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    
        console.log('Add task:', addTask);
        onClose?.(); 
  };
  const handleAddTaskSuccess = (newTask) => {
    setTasks(prevTasks => [...prevTasks, { id: newTask._id, ...newTask }]);
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
           Add New Task 
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                placeholder={title}
                error={titleError}
                helperText={titleErrorMessage}
                color={titleError ? 'error' : 'primary'}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="tags">Tags</FormLabel>
              <TextField
                fullWidth
                id="tags"
                placeholder={tags}
                onChange={(e) => setTags(e.target.value)}
                name="tags"
                autoComplete="tags"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="complete">Complete</FormLabel>
              <TextField
                fullWidth
                name="complete"
                value={complete}
                onChange={(e) => setComplete(e.target.value)}
                type="boolean"
                id="complete"
                autoComplete="new-phone"
                variant="outlined"
              />
            </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Add Task
            </Button>
          </Box>
         
          
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}