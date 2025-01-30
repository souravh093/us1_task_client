import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AdminNavItems } from "@/constant/navItems/adminNavItems";
import { UserNavItems } from "@/constant/navItems/userNavItems";
import { currentUser } from "@/services/AuthService";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";

export async function AppSidebar() {
  const userData = await currentUser();
  const items = userData?.role === "ADMIN" ? AdminNavItems : UserNavItems;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="p-2">
            <Link className="flex items-center space-x-2" href="/">
              <Image src={Logo} alt="logo" width={40} height={40} />
              <h1 className="font-bold text-xl text-black uppercase">
                Skill Hunt
              </h1>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
