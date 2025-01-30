import { Brush, Mic, Gauge, History, Star } from "lucide-react";

export const UserNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Skill",
    url: "/dashboard/skills",
    icon: Mic,
  },
  {
    title: "Session",
    url: "/dashboard/sessions",
    icon: Brush,
  },
  {
    title: "Review",
    url: "/dashboard/reviews",
    icon: Star,
  },
  {
    title: "Session History",
    url: "/dashboard/session-history",
    icon: History,
  },
];
