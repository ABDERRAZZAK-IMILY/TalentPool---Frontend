import { createBrowserRouter } from 'react-router-dom';
import HOME from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Layout from '../layouts/Layout.jsx';
import Recuiter from '../layouts/RecruiterLayouts.jsx';
import DashboardRecuiter from '../pages/Recruiter_manager/DashboardRecuiter.jsx';
import CreateAnnonce  from '../pages/Recruiter_manager/CreateAnnonce.jsx';
import MesAnnonces from '../pages/Recruiter_manager/Annonces.jsx';
import CandidatLayout from '../layouts/CandidatLayout.jsx';

import DeleteAnnonce from '../pages/Recruiter_manager/DeleteAnnonce.jsx';

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


  element : <Recuiter />,
  
  children : [


    
    {
        path: "/reciter/dashboard",
        element: <DashboardRecuiter/>
    },
    {
      path: "/reciter/create-annonce",
      element: <CreateAnnonce/>
    } ,

    {
     
      path: "/reciter/annonces",
      element: <MesAnnonces/>


    },
    {
      path: "/reciter/annonces/:id/delete",
      element: <DeleteAnnonce/>
    }
  ]
 }
,

{

element : <CandidatLayout />,

children :  [

 


]




}




]);
