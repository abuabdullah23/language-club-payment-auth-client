import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ManageClasses from "../pages/Dashboard/AdminPanel/ManageClasses/ManageClasses";
import AddClass from "../pages/Dashboard/InstructorPanel/AddClass/AddClass";
import MySelectedClasses from "../pages/Dashboard/UserPanel/MySelectedClasses/MySelectedClasses";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/AdminPanel/ManageUsers/ManageUsers";
import MyClasses from "../pages/Dashboard/InstructorPanel/MyClasses/MyClasses";
import TotalEnrolledStudents from "../pages/Dashboard/InstructorPanel/TotalEnrolledStudents/TotalEnrolledStudents";
import Feedback from "../pages/Dashboard/InstructorPanel/Feedback/Feedback";
import AdminFeedback from "../pages/Dashboard/AdminPanel/AdminFeedback/AdminFeedback";
import UpdateClassInfo from "../pages/Dashboard/InstructorPanel/UpdateClassInfo/UpdateClassInfo";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";
import ErrorPage from "../layout/ErrorPage";
import Payment from "../pages/Dashboard/UserPanel/Payment/Payment";
import MyEnrolledClasses from "../pages/Dashboard/UserPanel/MyEnrolledClasses/MyEnrolledClasses";
import PaymentHistory from "../pages/Dashboard/UserPanel/PaymentHistory/PaymentHistory";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'instructors',
                element: <Instructors />
            },
            {
                path: 'classes',
                element: <Classes />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signUp',
                element: <SignUp />
            }
        ]
    },
    {
        path: 'dashboard/',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // Admin Routes
            {
                path: 'manage-classes',
                element: <AdminRoute><ManageClasses /></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'admin-feedback/:id',
                element: <AdminRoute><AdminFeedback /></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/dashboard/admin-feedback/${params.id}`)
            },

            // Instructor Routes
            {
                path: 'add-class',
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: 'my-classes',
                element: <InstructorRoute><MyClasses /></InstructorRoute>
            },
            {
                path: 'update-class/:id',
                element: <InstructorRoute><UpdateClassInfo /></InstructorRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/class/display/${params.id}`)
            },
            {
                path: 'total-enrolled-students',
                element: <InstructorRoute><TotalEnrolledStudents /></InstructorRoute>
            },
            {
                path: 'feedback',
                element: <InstructorRoute><Feedback /></InstructorRoute>
            },

            // User Routes
            {
                path: 'my-selected-classes',
                element: <MySelectedClasses></MySelectedClasses>
            },
            {
                path: 'my-enrolled-classes',
                element: <MyEnrolledClasses></MyEnrolledClasses>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => {
                    const token = localStorage.getItem('access-token')
                    // console.log(token)
                    return fetch(`http://localhost:5000/cart/${params.id}`, {
                        method: "GET",
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                    })
                }
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;