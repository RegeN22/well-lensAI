import { createBrowserRouter } from "react-router-dom";
import NewScanPage from "./NewScanPage/NewScanPage";
import UploadPic from "./UploadPic.tsx/UploadPic";
import ScansPage from "./ScansPage/ScansPage";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";
import Layout from "./Layout";

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
    ],
  },
]);
