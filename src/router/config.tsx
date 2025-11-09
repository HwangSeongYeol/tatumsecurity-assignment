import { lazy } from "react";
import type { ReactNode } from "react";
import {
  BoxesIcon,
  CloudCogIcon,
  PackageIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  children?: MenuItem[]; // 접힘 그룹
};

export type AppRoute = {
  path: string;
  element: ReactNode;
  menu?: MenuItem;
  children?: AppRoute[];
};

// 페이지 코드 분할 (lazy)
const AppLayout = lazy(() => import("../layouts/AppLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const CloudManagementPage = lazy(() => import("../pages/CloudManagementPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// 공통 트리 (라우터 & 메뉴의 단일 소스)
export const appRoutes: AppRoute[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "package",
        element: <div />,
        menu: { id: "package", label: "패키지", icon: <PackageIcon />, path: "/package" },
      },
      {
        path: "config",
        element: <div />,
        menu: { id: "config", label: "설정", icon: <SlidersHorizontalIcon /> },
        children: [
          {
            path: "auth-management",
            element: <div />,
            menu: {
              id: "auth-management",
              label: "권한 관리",
              path: "/config/auth-management",
              icon: <UsersIcon />,
            },
          },
          {
            path: "cloud-management",
            element: <CloudManagementPage />,
            menu: {
              id: "cloud-management",
              label: "클라우드 관리",
              path: "/config/cloud-management",
              icon: <CloudCogIcon />,
            },
          },
          {
            path: "cloud-group-management",
            element: <CloudManagementPage />,
            menu: {
              id: "cloud-group-management",
              label: "클라우드 그룹 관리",
              path: "/config/cloud-group-management",
              icon: <BoxesIcon />,
            },
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
