// router/index.tsx
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { appRoutes, type AppRoute } from "./config";

// AppRoute -> RouteObject 변환
function toRouteObjects(nodes: AppRoute[]): RouteObject[] {
  return nodes.map((node) => ({
    path: node.path,
    element: node.element,
    children: node.children ? toRouteObjects(node.children) : undefined,
  }));
}

const router = createBrowserRouter(toRouteObjects(appRoutes));
export default router;
