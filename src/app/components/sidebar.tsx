"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  ChartPie,
  CirclePlay,
  GalleryVerticalEnd,
  Home,
  House,
  User,
  Zap,
} from "lucide-react";

const iconMap = {
  "chart-pie": ChartPie,
  "circle-play": CirclePlay,
  "gallery-vertical-end": GalleryVerticalEnd,
  home: Home,
  house: House,
  user: User,
  zap: Zap,
};

type IconName =
  | "house"
  | "user"
  | "zap"
  | "circle-play"
  | "gallery-vertical-end"
  | "chart-pie"
  | "home";

interface SubMenuItem {
  name: string;
  path: string;
  icon: IconName;
}

interface MenuItem {
  subMenuItems: SubMenuItem[];
  group?: string;
}

interface DynamicIconProps {
  iconName: IconName;
  color?: string;
  size?: number;
}

const DynamicIcon = ({
  iconName,
  color = "black",
  size = 24,
}: DynamicIconProps) => {
  // Get the icon component dynamically from the map
  const IconComponent = iconMap[iconName];
  // If the icon exists, render it with the passed props
  return IconComponent ? <IconComponent color={color} size={size} /> : null;
};

const menuItems: MenuItem[] = [
  {
    subMenuItems: [
      { name: "Home", path: "/", icon: "house" },
      { name: "Profile", path: "/profile", icon: "user" },
    ],
  },
  {
    group: "Learn",
    subMenuItems: [
      { name: "Shorts", path: "/shorts", icon: "zap" },
      { name: "Classes", path: "/classes", icon: "circle-play" },
      { name: "Courses", path: "/courses", icon: "gallery-vertical-end" },
    ],
  },
  {
    group: "Team",
    subMenuItems: [
      { name: "Analytics", path: "/analytics", icon: "chart-pie" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-60 bg-[#FAF9F6] py-3 px-5 border-r-[1px] border-[#F2F0E9] gap-5">
      {/* Logo */}
      <Link
        className="flex items-center justify-center w-9 h-9 bg-white rounded-md border-[1px] border-[#F2F0E9]"
        href="/"
      >
        <Image src="/img/logo.png" alt="logo" width={20} height={20} />
      </Link>
      {/* Menu items */}
      <div className="flex flex-col gap-5">
        {menuItems.map((menuItem, index) => (
          <div key={index} className="flex flex-col gap-1">
            {menuItem.group && (
              <div className="font-normal text-xs leading-4 text-[#787777]">
                {menuItem.group}
              </div>
            )}
            <ul>
              {menuItem.subMenuItems.map((subMenuItem) => (
                <li key={`${subMenuItem.path}-${subMenuItem.name}`}>
                  <Link
                    href={subMenuItem.path}
                    className={`${
                      pathname === subMenuItem.path
                        ? "bg-[#E9E8DD] text-[#212121]"
                        : "text-[#787777]"
                    } flex flex-row items-center gap-1 p-1 rounded text-sm leading-5 font-medium`}
                  >
                    <DynamicIcon
                      iconName={subMenuItem.icon}
                      color="#787777"
                      size={16}
                    />
                    {subMenuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
