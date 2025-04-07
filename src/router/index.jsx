import { createBrowserRouter } from 'react-router-dom';
import HOME from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Layout from '../layouts/Layout.jsx';

export const router = createBrowserRouter([
  {
   element : <Layout />,
 
   children : [


    
    {
        path: "/",
        element: <HOME />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
   path: "/register",
   element : <Register />

    }



   ]

  }


]);
