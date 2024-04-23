import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import ElectionContainer from "../pages/election/ElectionContainer";
import Election from "../pages/election";
import ElectionDetails from "../pages/ElectionPage";
import ElectionDetailsContainer from "../pages/ElectionPage/ElectionPageContainer";
import OptionDetailsContainer from "../pages/options";
import VotersDetailsContainer from "../pages/voter";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/election" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // Protected Routes
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/account/election" replace /> },
      {
        path: "election",
        element: <ElectionContainer />,
        children: [
          { index: true, element: <Election /> },
          {
            path: ":electionID",
            element: <ElectionDetailsContainer />,
            children: [{ index: true, element: <></> }],
          },
        ],
      },
      {
        path: "voters/:electionID",
        element: <VotersDetailsContainer />,
      },
      {
        path: "quetion",
        children: [
          { index: true, element: <></> },
          {
            path: ":electionID/:quetionID",
            element: <OptionDetailsContainer />,
          },
        ],
      },
    ],
  },
]);

export default router;
