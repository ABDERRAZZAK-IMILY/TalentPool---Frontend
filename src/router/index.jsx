import { createBrowserRouter } from 'react-router-dom';
import HOME from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Layout from '../layouts/Layout.jsx';
import Recuiter from '../layouts/RecruiterLayouts.jsx';
import FetchDataComponent from '../pages/datafetch.jsx';
import DashboardRecuiter from '../pages/Recruiter_manager/DashboardRecuiter.jsx';
import CreateAnnonce  from '../pages/Recruiter_manager/CreateAnnonce.jsx';


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
,
 {

path : "/test" ,

element : <FetchDataComponent />


 }

,

 {


 
 }



]);
