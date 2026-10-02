"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Search, UserRound } from "lucide-react";
import { primaryNav } from "@/lib/site";
import type { Product } from "@/types";
import type { SearchItem } from "@/lib/search";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchOverlay } from "./search-overlay";
import { cn } from "@/lib/utils";

type Props = {
  themes: Product[];
  plugins: Product[];
  searchItems: SearchItem[];
};

export function Header({ themes, plugins, searchItems }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<"themes" | "plugins" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const lastY = useRef(0);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Scroll behaviour: compact + blurred after 24px, hide on fast downward scroll.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - lastY.current;
        if (y > 160 && delta > 6) setHidden(true);
        else if (delta < -4 || y < 160) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close menus on route change (state adjusted during render, per React guidance).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  // Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mega menu when focus leaves the nav.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenMenu(null);
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-base ease-out-expo",
          scrolled
            ? "border-b border-stone-200/70 bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
          hidden && !openMenu && !mobileOpen
            ? "-translate-y-full"
            : "translate-y-0",
        )}
        data-scrolled={scrolled}
        onMouseLeave={scheduleClose}
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          className={cn(
            "container-x relative flex items-center justify-between transition-[height] duration-base ease-out-expo",
            scrolled ? "h-16" : "h-(--header-h)",
          )}
        >
          <Logo
            className={cn(
              "transition-transform duration-base ease-out-expo",
              scrolled && "scale-[0.92] origin-left",
            )}
          />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              const isMenu = Boolean(item.menu);
              const expanded = openMenu === item.menu;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    if (item.menu) setOpenMenu(item.menu);
                    else setOpenMenu(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-9 items-center gap-1 rounded-full px-3.5 text-[14px] font-medium transition-colors",
                      active || expanded
                        ? "bg-ink/[0.06] text-ink"
                        : "text-stone-700 hover:bg-ink/[0.05] hover:text-ink",
                    )}
                    aria-haspopup={isMenu ? "true" : undefined}
                    aria-expanded={isMenu ? expanded : undefined}
                    aria-controls={isMenu ? `menu-${item.menu}` : undefined}
                    onKeyDown={(e) => {
                      if (isMenu && (e.key === "ArrowDown" || e.key === " ")) {
                        e.preventDefault();
                        setOpenMenu(item.menu!);
                        requestAnimationFrame(() =>
                          document
                            .querySelector<HTMLElement>(`#menu-${item.menu} a`)
                            ?.focus(),
                        );
                      }
                    }}
                  >
                    {item.label}
                    {isMenu && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-base",
                          expanded && "rotate-180",
                        )}
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (⌘K)"
              className="grid size-10 place-items-center rounded-full text-stone-700 transition-colors hover:bg-ink/[0.05] hover:text-ink"
            >
              <Search className="size-[18px]" />
            </button>
            <a
              href="https://users.freemius.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium text-stone-700 transition-colors hover:bg-ink/[0.05] hover:text-ink md:flex"
              title="Manage licenses in the Freemius customer portal"
            >
              <UserRound className="size-[18px]" aria-hidden />
              <span className="hidden xl:inline">My Licenses</span>
            </a>
            <Button
              href="/products"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Explore Products
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>

          <div
            className="absolute inset-x-0 top-full"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <AnimatePresence>
              {openMenu && (
                <MegaMenu
                  key={openMenu}
                  id={`menu-${openMenu}`}
                  kind={openMenu}
                  products={openMenu === "themes" ? themes : plugins}
                  onNavigate={() => setOpenMenu(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>
      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        themes={themes}
        plugins={plugins}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={closeSearch}
        items={searchItems}
      />
    </>
  );
}
