import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { appRoutes, type AppRoute, type MenuItem } from "@/router/config";
import { Fragment, useMemo } from "react";

/** appRoutes에서 메뉴 항목 평탄화 (path -> label) */
function flattenMenu(routes: AppRoute[], acc: Record<string, string> = {}): Record<string, string> {
  const walk = (nodes: AppRoute[]) => {
    nodes.forEach((n) => {
      if (n.menu?.path && n.menu?.label) {
        acc[n.menu.path] = n.menu.label;
      }
      if (n.children?.length) walk(n.children);
    });
  };
  // 최상위의 children만 탐색
  const root = routes.find((r) => r.path === "/");
  if (root?.children) walk(root.children);
  // 홈 라벨 보정
  acc["/"] = acc["/"] || "Home";
  return acc;
}

/** `/a/b/c` -> ["/", "/a", "/a/b", "/a/b/c"] */
function splitCumulativePaths(pathname: string): string[] {
  const clean = pathname.replace(/\/+$/g, ""); // 뒤 슬래시 제거
  if (clean === "" || clean === "/") return ["/"];
  const parts = clean.split("/").filter(Boolean);
  const acc: string[] = ["/"];
  parts.reduce((prev, cur) => {
    const next = prev === "/" ? `/${cur}` : `${prev}/${cur}`;
    acc.push(next);
    return next;
  }, "/");
  return acc;
}

/** 라벨 없을 때 폴백 (slug -> Title Case) */
function fallbackLabelFromPath(p: string) {
  const seg = p.split("/").filter(Boolean).pop() ?? "";
  return seg.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) || "Home";
}

const GNB = () => {
  const { pathname } = useLocation();

  // 경로->라벨 맵 (메뉴 설정 기반)
  const pathLabelMap = useMemo(() => flattenMenu(appRoutes), []);
  // 누적 경로 리스트
  const crumbs = useMemo(() => splitCumulativePaths(pathname), [pathname]);

  // 마지막 항목(현재 페이지)
  const last = crumbs[crumbs.length - 1];

  return (
    <div className="sticky top-0 right-0 left-0 z-20 bg-white">
      <div className="flex h-[54px] items-center justify-between gap-8 bg-white ps-6 pe-7">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((p) => {
                const label = pathLabelMap[p] ?? fallbackLabelFromPath(p);
                const isLast = p === last;

                return (
                  <Fragment key={p}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        // shadcn은 asChild로 react-router Link를 래핑하는 패턴 권장
                        <BreadcrumbLink asChild>
                          <Link to={p}>{label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default GNB;
