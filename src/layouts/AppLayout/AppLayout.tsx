import { Outlet, ScrollRestoration } from "react-router-dom";
import LNB from "@/components/common/organimsms/LNB";
import GNB from "@/components/common/organimsms/GNB";

const AppLayout = () => {
  return (
    <div className="flex h-full overflow-y-hidden">
      <ScrollRestoration />
      <LNB />
      <div className="relative flex w-full flex-1 flex-col overflow-y-auto">
        <GNB />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
