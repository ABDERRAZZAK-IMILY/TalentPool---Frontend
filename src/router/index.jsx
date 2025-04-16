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
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';


import DashboardCandidat from '../pages/Candidat_manger/DashboardCandiat.jsx';
import MesCandidatures from '../pages/Candidat_manger/MesCandidatures.jsx';
import PostulerAnnonce from '../pages/Candidat_manger/PostulerAnnonce.jsx';
import Offer from '../pages/Candidat_manger/Offer.jsx';

import CandidatureDetails from '../pages/Recruiter_manager/CandidatureDetails.jsx';
import Candidatures from '../pages/Recruiter_manager/Candidatures.jsx';
import UpdateAnnonce from '../pages/Recruiter_manager/UpdateAnnonce.jsx';

import CandidatureDetail from '../pages/Candidat_manger/CandidatureDetails.jsx';
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

    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
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
      path: "/reciter/candidatures",
      element: <Candidatures/>
    },
    {
     path : "/recruiter/candidatures/:candidatureId",
      element : <CandidatureDetails/>


    },
    {
      path: "/reciter/annonces/edit/:id",
      element: <UpdateAnnonce/>
    }
  ]
 }
,

{

element : <CandidatLayout />,

children :  [

    {
  path : "/candidat/dashboard",
  element : <DashboardCandidat/>
    } ,

    {
  path : "/candidat/annonces",
  element : <Offer/>
    }
,
    {
      path: "/candidat/postuler/:annonceId",

   element : <PostulerAnnonce/>
    }
,
    {
  path : "/candidat/mes-candidatures",
  element : <MesCandidatures/>
    },
    {
  path : "/candidat/candidatures/:candidatureId",
  element : <CandidatureDetail/>
    }

]




}




]);
