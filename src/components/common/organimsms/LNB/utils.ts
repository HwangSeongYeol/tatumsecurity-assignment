import type { AppRoute, MenuItem } from "@/router/config";

export function collectMenuItems(routes: AppRoute[]): MenuItem[] {
  const walk = (nodes: AppRoute[]): MenuItem[] =>
    nodes.flatMap((n) => {
      const meta = n.menu;
      const children = n.children ? walk(n.children) : [];

      if (!meta && children.length) return children; // 섹션만 있는 경우 children만 승격

      if (!meta) return []; // 메뉴 메타가 없는 일반 라우트는 LNB에서 숨김

      const item: MenuItem = {
        id: meta.id,
        label: meta.label,
        path: meta.path,
        icon: meta.icon,
        children: children.length ? children : undefined,
      };
      return [item];
    });

  const root = routes.find((r) => r.path === "/");
  return root?.children ? walk(root.children) : [];
}
// 경로 매칭: 정확 일치 또는 "prefix + /" 일치 허용
const matches = (nodePath: string, pathname: string) =>
  pathname === nodePath || pathname.startsWith(nodePath + "/");

// 현재 pathname에 해당하는 메뉴의 조상 그룹 id들을 반환
export function findAncestorIdsByPath(items: MenuItem[], pathname: string): string[] {
  const acc: string[] = [];

  const dfs = (nodes: MenuItem[], stack: string[]): boolean => {
    for (const n of nodes) {
      const nextStack = n.children?.length ? [...stack, n.id] : stack;

      // 1) 자신이 경로 매칭되는 경우(leaf일 수도 있고 children이 있을 수도 있음)
      if (n.path && matches(n.path, pathname)) {
        acc.push(...stack);
        return true;
      }
      // 2) 자식들 안에서 매칭되는 경우
      if (n.children?.length && dfs(n.children, nextStack)) {
        return true;
      }
    }
    return false;
  };

  dfs(items, []);
  // 중복 제거
  return Array.from(new Set(acc));
}
