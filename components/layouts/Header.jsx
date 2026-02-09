"use client";

import Button from "@/components/ui/Button";
import MagneticElement from "@/components/ui/MagneticElement";
import { navLinks } from "@/constants";
import { cn } from "@/libs/cn";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Use light text when on non-home pages (colored hero) and not scrolled
  const isHome = pathname === "/";
  const useLightText = !isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { y: -100 }}
        animate={prefersReducedMotion ? {} : { y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isScrolled
            ? "bg-cream/95 backdrop-blur-md border-secondary-200"
            : "bg-transparent border-transparent pt-5",
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <MagneticElement strength={0.2}>
              <Link href="/" className="group">
                <span
                  className={cn(
                    "block font-crimson text-2xl md:text-3xl font-bold transition-colors duration-300 tracking-tight",
                    useLightText
                      ? "text-white group-hover:text-white/80"
                      : "text-secondary-900 group-hover:text-primary-600",
                  )}
                >
                  Tom Sampson
                </span>
                <span
                  className={cn(
                    "block text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300",
                    useLightText
                      ? "text-white/70 group-hover:text-white"
                      : "text-secondary-500 group-hover:text-primary-500",
                  )}
                >
                  Author & Coach
                </span>
              </Link>
            </MagneticElement>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <MagneticElement key={link.name} strength={0.15}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative font-crimson text-sm tracking-[0.15em] uppercase transition-colors duration-300 py-2",
                      "group",
                      useLightText
                        ? "text-white/80 hover:text-white"
                        : "text-secondary-600 hover:text-primary-600",
                      pathname === link.href &&
                        (useLightText
                          ? "text-white font-semibold"
                          : "text-primary-600 font-semibold"),
                    )}
                  >
                    {link.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                        useLightText ? "bg-white" : "bg-primary-500",
                        pathname === link.href
                          ? "w-full"
                          : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </MagneticElement>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticElement strength={0.2}>
                <Button
                  href="/"
                  size="sm"
                  variant={useLightText ? "outline" : "primary"}
                  className={
                    useLightText
                      ? "border-white text-white hover:bg-white/10"
                      : ""
                  }
                >
                  Order Book
                </Button>
              </MagneticElement>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "md:hidden p-2 transition-all border",
                useLightText
                  ? "text-white hover:text-white/80 hover:bg-white/10 border-white/30 hover:border-white/60"
                  : "text-secondary-700 hover:text-primary-600 hover:bg-primary-50 border-secondary-300 hover:border-primary-500",
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
