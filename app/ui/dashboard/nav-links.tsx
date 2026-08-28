"use client";

import {
  HomeIcon,
  DocumentDuplicateIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/ui/theme-provider";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Spendings",
    href: "/dashboard/spendings",
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              { "bg-primary/10 text-primary": link.href === pathname },
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-surface-muted p-3 text-sm font-medium hover:bg-primary/10 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <ThemeToggle />
    </>
  );
}

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? SunIcon : MoonIcon;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-surface-muted p-3 text-sm font-medium hover:bg-primary/10 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
      )}
    >
      <Icon className="w-6" aria-hidden="true" />
      <span className="hidden md:block">Theme</span>
    </button>
  );
}
