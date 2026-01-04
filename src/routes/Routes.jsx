import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WorkerHome from "../pages/dashboard/worker/WorkerHome";
import TaskList from "../pages/dashboard/worker/TaskList";
import MySubmissions from "../pages/dashboard/worker/MySubmissions";
import Withdrawals from "../pages/dashboard/worker/Withdrawals";
import BuyerHome from "../pages/dashboard/buyer/BuyerHome";
import AddTask from "../pages/dashboard/buyer/AddTask";
import MyTasks from "../pages/dashboard/buyer/MyTasks";
import PurchaseCoin from "../pages/dashboard/buyer/PurchaseCoin";
import PaymentHistory from "../pages/dashboard/buyer/PaymentHistory";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageTasks from "../pages/dashboard/admin/ManageTasks";
import WithdrawRequests from "../pages/dashboard/admin/WithdrawRequests";


import PrivateRoute from "./PrivateRoute";
import TaskDetails from "../pages/dashboard/worker/TaskDetails";
import AdminHome from "../pages/dashboard/admin/AdminHome";

import DashboardWelcome from "../pages/dashboard/DashboardWelcome";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
         path: "/",
         element: <Home />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // Redirect to appropriate dashboard home
            { index: true, element: <DashboardWelcome /> },
            
            // Worker Routes
            { path: "worker", element: <WorkerHome /> },
            { path: "worker/tasklist", element: <TaskList /> },
            { path: "worker/task/:id", element: <TaskDetails /> }, 
            { path: "worker/my-submissions", element: <MySubmissions /> },
            { path: "worker/withdrawals", element: <Withdrawals /> },
            
            // Buyer Routes
            { path: "buyer", element: <BuyerHome /> },
            { path: "buyer/add-task", element: <AddTask /> },
            { path: "buyer/my-tasks", element: <MyTasks /> },
            { path: "buyer/purchase-coin", element: <PurchaseCoin /> },
            { path: "buyer/payment-history", element: <PaymentHistory /> },
            
             // Admin Routes
            { path: "admin", element: <AdminHome /> },
            { path: "admin/manage-users", element: <ManageUsers /> },
            { path: "admin/manage-tasks", element: <ManageTasks /> },
            { path: "admin/withdraw-requests", element: <WithdrawRequests /> },
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

export default router;
