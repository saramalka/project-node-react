import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from './ResponsiveAppBar'
import UserList from './Components/Users/UserList'
import PhotoGrid from './Components/Photoes/PhotoGrid';
import PostList from './Components/Posts/PostList';
import TaskList from './Components/Tasks/TaskList';

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
