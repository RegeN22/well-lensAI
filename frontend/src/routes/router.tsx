import { createBrowserRouter } from "react-router-dom";
import ScansPage from "./ScansPage/ScansPage";
import NewScanPage from "./NewScanPage/NewScanPage";
import Index from ".";

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/home',
    element: <ScansPage />
  },
  {
    path: '/new',
    element: <NewScanPage />
  }
]);