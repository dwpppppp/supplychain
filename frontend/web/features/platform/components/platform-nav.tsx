"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "知识图谱" },
  { href: "/assistant", label: "AI助学" },
  { href: "/course", label: "课程文档" },
  { href: "/training", label: "模拟实训" },
];

export function PlatformNav() {
  const pathname = usePathname();

  return (
    <nav className="platform-nav" aria-label="主导航">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            className={`nav-link${isActive ? " is-active" : ""}`}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
