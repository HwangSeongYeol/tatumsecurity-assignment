import { Outlet, ScrollRestoration } from "react-router-dom";
import LNB from "@/components/common/organimsms/LNB";
import GNB from "@/components/common/organimsms/GNB";
import { Suspense } from "react";

const AppLayout = () => {
  return (
    <div className="flex h-full overflow-y-hidden">
      <ScrollRestoration />
      <LNB />
      <div className="relative flex w-full flex-1 flex-col overflow-y-auto">
        <GNB />
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center px-6 py-12">Loading...</div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AppLayout;
