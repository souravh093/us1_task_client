import { Gauge, Users, Star, ChartColumnIncreasing } from "lucide-react";

// Menu items.
export const AdminNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Skills Treads",
    url: "/dashboard/skills-treads",
    icon: ChartColumnIncreasing,
  },
  {
    title: "All Sessions",
    url: "/dashboard/all-sessions",
    icon: Star,
  },
];
