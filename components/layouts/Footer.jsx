"use client";

import Button from "@/components/ui/Button";
import { DividerLine } from "@/components/ui/editorial";
import MagneticElement from "@/components/ui/MagneticElement";
import { contactDetails, footerLinks, socialLinks } from "@/constants";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ContactIcon = contactDetails.icons;

  return (
    <footer className="relative bg-secondary-900 paper-texture paper-texture-dark text-cream overflow-hidden">
      <div className="h-px bg-secondary-700" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block group mb-6">
              <span className="block font-crimson text-3xl font-bold text-cream group-hover:text-primary-300 transition-colors duration-300">
                Tom Sampson
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-secondary-400 mt-1">
                Author & Tennis Coach
              </span>
            </Link>
            <p className="text-secondary-300 leading-relaxed mb-8 max-w-xs">
              Former international tennis player and author of &ldquo;A Handful
              of Promise&rdquo; — sharing decades of experience to guide the
              next generation.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <MagneticElement key={social.name} strength={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-secondary-600 hover:border-primary-500 hover:bg-primary-500/10 flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 text-secondary-400 group-hover:text-primary-400 transition-colors" />
                    </a>
                  </MagneticElement>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-400 mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-crimson text-secondary-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-400 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <ContactIcon.email className="w-4 h-4 text-secondary-500" />
                  <span>{contactDetails.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                  className="text-secondary-300 hover:text-primary-400 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <ContactIcon.phone className="w-4 h-4 text-secondary-500" />
                  <span>{contactDetails.phone}</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h3 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-400 mb-6">
              Get the Book
            </h3>
            <p className="text-secondary-300 mb-6">
              Discover the insider&apos;s guide to professional tennis.
            </p>
            <Button
              href="/"
              size="sm"
              className="bg-primary-600 hover:bg-primary-700 border-primary-600 hover:border-primary-700"
            >
              Order Your Copy
            </Button>
          </motion.div>
        </div>

        <div className="border-t border-secondary-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-500 text-sm font-crimson">
              © {currentYear} Tom Sampson. All rights reserved.
            </p>

            <MagneticElement strength={0.3}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 text-secondary-400 hover:text-primary-400 transition-colors duration-300 group"
                aria-label="Back to top"
              >
                <span className="font-crimson text-sm tracking-wide">
                  Return to Top
                </span>
                <span className="w-10 h-10 border border-secondary-600 group-hover:border-primary-500 flex items-center justify-center transition-all duration-300">
                  <ArrowUp className="w-4 h-4" />
                </span>
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>
    </footer>
  );
}
