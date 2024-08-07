//import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './views/Homepage';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import SearchResults from './views/SearchResults'
import PostDetails from './views/PostDetails'

function App() {


  const router = createBrowserRouter(
    [
      // {path:"/", element:<PostPageHome />},
      // {path:"/login", element:<LoginPage />},
      // {path:"/signup", element:<SignUpPage />},
      // {path:"/add", element:<PostPageAdd />},
      // {path:"/post/:id", element:<PostPageDetails/>},
      // {path:"/update/:id", element:<PostPageUpdate/>}
      {path:"/", element:<Homepage/>},
      {path:"/login", element:<LoginPage/>},
      {path:"/profile/:id", element:<ProfilePage/>},
      {path:"/add", element:<CreatePost/>},
      {path:"/edit/:id", element:<EditPost/>},
      {path:"action_page.php?search=", element:<SearchResults/>},
      {path:"/post/:id", element:<PostDetails/>},
    ]
  )



  return (
    <RouterProvider router={router} />
  );
}

export default App;
