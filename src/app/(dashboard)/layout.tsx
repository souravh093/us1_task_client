import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProfileDropdown from "@/components/shared/dashboard/ProfileDropdown";
import { currentUser } from "@/services/AuthService";
import { AppSidebar } from "./_components/AppSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData = await currentUser();
  console.log(userData);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-[#FCFCFD]">
        <div className="flex items-center justify-between border-b-2 p-2">
          <SidebarTrigger />
          <div className="flex items-center gap-6">
            <ProfileDropdown data={userData} />
          </div>
        </div>
        <div className="p-5 m-5 rounded-md border min-h-screen">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
