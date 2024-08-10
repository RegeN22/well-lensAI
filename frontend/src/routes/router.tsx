import { createBrowserRouter } from "react-router-dom";
import ScansPage from "./ScansPage/ScansPage";
import NewScanPage from "./NewScanPage/NewScanPage";
import UploadPic from "./UploadPic.tsx/UploadPic";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ScansPage />,
  },
  {
    path: "/new",
    element: <UploadPic />,
  },
]);
