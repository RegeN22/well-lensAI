import { createBrowserRouter } from "react-router-dom";
import ScansPage from "./ScansPage/ScansPage";
import UploadPic from "./UploadPicPage/UploadPic";
import EditUserPage from "./EditUserPage/EditUserPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ScansPage />,
  },
  {
    path: "/new",
    element: <UploadPic />,
  },
  {
    path: '/edit-user',
    element: <EditUserPage />
  }
]);
