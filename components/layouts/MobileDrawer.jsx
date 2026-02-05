"use client";

import Button from "@/components/ui/Button";
import { navLinks, socialLinks } from "@/constants";
import { cn } from "@/libs/cn";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileDrawer({ isOpen, onClose }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-secondary-950/50 backdrop-blur-sm z-50 md:hidden"
          />

          <motion.div
            initial={prefersReducedMotion ? {} : { x: "100%" }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? {} : { x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-70 bg-white z-50 md:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-secondary-100">
                <span className="font-crimson text-xl font-bold text-secondary-900">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-secondary-700 hover:text-primary-600 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={
                        prefersReducedMotion ? {} : { opacity: 0, x: 20 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300",
                          pathname === link.href
                            ? "bg-primary-50 text-primary-600"
                            : "text-secondary-700 hover:bg-secondary-50 hover:text-primary-600",
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-secondary-100 space-y-4">
                <Button href="/" className="w-full" onClick={onClose}>
                  Buy Now
                </Button>

                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
