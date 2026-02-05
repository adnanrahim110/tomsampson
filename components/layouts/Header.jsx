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
                <span className="block font-crimson text-2xl md:text-3xl font-bold text-secondary-900 group-hover:text-primary-700 transition-colors duration-300 tracking-tight">
                  Tom Sampson
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-secondary-500 mt-0.5">
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
                      "relative font-crimson text-sm tracking-[0.15em] uppercase text-secondary-700 hover:text-primary-700 transition-colors duration-300 py-2",
                      "group",
                      pathname === link.href && "text-primary-700",
                    )}
                  >
                    {link.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-primary-500 transition-all duration-300",
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
                <Button href="/" size="sm">
                  Order Book
                </Button>
              </MagneticElement>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-secondary-700 hover:text-primary-700 transition-colors border border-secondary-300 hover:border-primary-400"
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
