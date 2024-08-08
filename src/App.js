//import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './views/Homepage';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import SearchResults from './views/SearchResults'
import PostDetails from './views/PostDetails'
import Signup from './views/Signup'

function App() {


  const router = createBrowserRouter(
    [
      {path:"/", element:<Homepage/>},
      {path:"/login", element:<LoginPage/>},
      {path:"/profile/:id", element:<ProfilePage/>},
      {path:"/add", element:<CreatePost/>},
      {path:"/edit/:id", element:<EditPost/>},
      {path:"action_page.php?search=", element:<SearchResults/>},
      {path:"/post/:id", element:<PostDetails/>},
      {path:"/signup", element:<Signup />},
    ]
  )



  return (
    <RouterProvider router={router} />
  );
}

export default App;
