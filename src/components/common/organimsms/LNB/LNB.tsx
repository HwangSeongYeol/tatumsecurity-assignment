import { Fragment, useEffect, useMemo, useState } from "react";
import { Chevronright, LogoWin8 } from "../../../../assets";
import { appRoutes, type MenuItem } from "@/router/config";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";
import { collectMenuItems, findAncestorIdsByPath } from "./utils";

const LNB = () => {
  const [isLnbOpen, setIsLnbOpen] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const items = useMemo(() => collectMenuItems(appRoutes), []);
  const { pathname } = useLocation();

  // ✅ 새로고침 또는 경로 변경될 때, 해당 경로의 상위 그룹을 자동으로 펼침
  useEffect(() => {
    const ancestorIds = findAncestorIdsByPath(items, pathname);
    setExpanded((prev) => {
      // 자동 펼침 + 기존 수동 펼침을 유지하려면 '합집합'
      const next = new Set(prev);
      ancestorIds.forEach((id) => next.add(id));
      return next;

      // 자동 펼침만 반영하고 수동 펼침을 리셋하고 싶다면:
      // return new Set(ancestorIds);
    });
  }, [items, pathname]);

  const toggleGroup = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <aside
        className={`relative z-20 shrink-0 overflow-hidden bg-blue-500 transition-all duration-300 ease-in-out ${
          isLnbOpen ? "w-60" : "w-18"
        }`}
        aria-label="Left Navigation Bar"
      >
        <div className="flex h-14 items-center justify-center">
          <NavLink to="/" className="flex items-center gap-2">
            <LogoWin8 className="text-4xl text-white" />
          </NavLink>
        </div>

        <nav className="px-2 pb-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <Fragment key={item.id}>
                {item.children ? (
                  <LnbGroup
                    item={item}
                    isOpen={isLnbOpen}
                    expanded={expanded.has(item.id)}
                    onToggle={() => toggleGroup(item.id)}
                  />
                ) : (
                  <LnbLeaf item={item} isOpen={isLnbOpen} />
                )}
              </Fragment>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="relative w-px shrink-0 bg-gray-500">
        <div className="absolute top-12 -left-4 z-30 flex h-[54px] items-center">
          <button
            onClick={() => setIsLnbOpen((prev) => !prev)}
            className="flex size-8 items-center justify-center rounded-full border bg-blue-600 text-white hover:bg-blue-700"
            data-state={isLnbOpen ? "open" : "closed"}
            aria-label={isLnbOpen ? "사이드바 접기" : "사이드바 열기"}
          >
            <Chevronright
              className={`transition-transform duration-200 ${isLnbOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

const LnbLeaf = ({ item, isOpen }: { item: MenuItem; isOpen: boolean }) => {
  return (
    <li>
      <NavLink
        to={item.path ?? "#"}
        end
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg py-2 pl-2 text-white/90 hover:bg-white/10 ${
            isActive ? "bg-white/15 text-white" : ""
          }`
        }
      >
        {item.icon} {isOpen && <span className="truncate">{item.label}</span>}
      </NavLink>
    </li>
  );
};

function LnbGroup({
  item,
  isOpen,
  expanded,
  onToggle,
}: {
  item: MenuItem;
  isOpen: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/10"
        aria-expanded={expanded}
        aria-controls={`group-${item.id}`}
      >
        {item.icon}
        {isOpen && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <ChevronDownIcon
              className={`size-4 transition-transform ${expanded ? "rotate-0" : "-rotate-90"}`}
            />
          </>
        )}
        {!isOpen && (
          <ChevronDownIcon
            className={`absolute right-0 bottom-0 size-4 ${expanded ? "rotate-0" : "-rotate-90"}`}
          />
        )}
      </button>

      <ul
        id={`group-${item.id}`}
        className={`mt-2 overflow-hidden rounded-lg bg-blue-600 transition-all ${
          expanded ? "grid grid-rows-[1fr] p-2" : "grid grid-rows-[0fr]"
        }`}
      >
        <div className="flex min-h-0 flex-col gap-1">
          {item.children?.map((c) =>
            c.children ? (
              <LnbGroup
                key={c.id}
                item={c}
                isOpen={isOpen}
                expanded={expanded}
                onToggle={onToggle}
              />
            ) : (
              <LnbLeaf key={c.id} item={c} isOpen={isOpen} />
            )
          )}
        </div>
      </ul>
    </li>
  );
}

export default LNB;
