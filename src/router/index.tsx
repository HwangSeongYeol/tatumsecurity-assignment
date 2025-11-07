import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import CloudManagementPage from "../pages/CloudManagementPage";

const routeObjectList: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "cloud-management",
        element: <CloudManagementPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routeObjectList);

export default router;
