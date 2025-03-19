import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from './ResponsiveAppBar'
import UserList from './UserList';
import PhotoGrid from './PhotoGrid';
import PostList from './PostList';
import TaskList from './TaskList';

function App() {
  return (


    <div className="App">
        <BrowserRouter>
      <ResponsiveAppBar/>
          <Routes>
          {/* <Route path='/' element={<UserList/>}></Route> */}
            <Route path='/Users' element={<UserList/>}></Route>
            <Route path='/Albums' element={<PhotoGrid/>}></Route>
            <Route path='/Posts' element={<PostList/>}></Route>
            <Route path='/Tasks' element={<TaskList/>}></Route>
          </Routes>
          </BrowserRouter>
  
    </div>
  );
}

export default App;
