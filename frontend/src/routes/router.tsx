import { createBrowserRouter } from "react-router-dom";
import NewScanPage from "./NewScanPage/NewScanPage";
import UploadPic from "./UploadPic.tsx/UploadPic";
import ScansPage from "./ScansPage/ScansPage";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";
import ProfileEditPage from "./ProfileEditPage/ProfileEditPage";
import Layout from "./Layout";
import ProfilePage from "./ProfilePage/ProfilePage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <ScansPage />,
      },
      {
        path: "/home/new",
        element: <UploadPic />,
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/edit-profile',
        element: <ProfileEditPage />
      }
    ],
  },
]);
