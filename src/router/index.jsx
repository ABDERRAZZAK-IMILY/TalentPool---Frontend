import { createBrowserRouter } from 'react-router-dom';
import HOME from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';


export const router = createBrowserRouter([
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
]);
