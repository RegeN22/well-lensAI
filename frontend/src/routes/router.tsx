import { createBrowserRouter } from "react-router-dom";
import ScansPage from "./ScansPage/ScansPage";
import NewScanPage from "./NewScanPage/NewScanPage";

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ScansPage />
  },
  {
    path: '/new',
    element: <NewScanPage />
  }
]);