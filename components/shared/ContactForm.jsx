"use client";

import Button from "@/components/ui/Button";
import { DividerLine } from "@/components/ui/editorial";
import Input from "@/components/ui/Input";
import MagneticElement from "@/components/ui/MagneticElement";
import Textarea from "@/components/ui/Textarea";
import { contactDetails, socialLinks } from "@/constants";
import { cn } from "@/libs/cn";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export default function ContactForm({
  showInfo = true,
  centered = false,
  title = "Correspondence",
  subtitle = "Have questions about the book or interested in coaching? We'd love to hear from you.",
}) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const ContactIcon = contactDetails.icons;

  return (
    <section
      id="contact"
      className="relative bg-paper paper-texture editorial-spacing-md"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-secondary-200/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={centered ? "text-center mb-16" : "mb-16"}
        >
          <span className="inline-block font-crimson text-xs tracking-[0.4em] uppercase text-secondary-500 mb-4">
            Get in Touch
          </span>
          <h2 className="font-crimson text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl">{subtitle}</p>
          <div
            className={cn(
              "flex items-center gap-4 mt-6",
              centered && "justify-center",
            )}
          >
            <span className="w-16 h-px bg-primary-400" />
            <span className="w-2 h-2 bg-primary-500 rotate-45" />
            <span className="w-16 h-px bg-primary-400" />
          </div>
        </motion.div>

        <div
          className={cn(
            "grid gap-12 lg:gap-16",
            showInfo ? "lg:grid-cols-12" : "max-w-2xl mx-auto",
          )}
        >
          {showInfo && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-6">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-start gap-5 p-5 bg-parchment border border-secondary-200 hover:border-primary-400 transition-colors duration-300 group"
                >
                  <span className="p-3 bg-cream border border-secondary-200 text-primary-600 group-hover:bg-primary-600 group-hover:text-cream group-hover:border-primary-600 transition-all duration-300">
                    <ContactIcon.email className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-crimson font-semibold text-secondary-900 mb-1">
                      Email
                    </h4>
                    <p className="text-secondary-600 group-hover:text-primary-700 transition-colors">
                      {contactDetails.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-5 p-5 bg-parchment border border-secondary-200 hover:border-primary-400 transition-colors duration-300 group"
                >
                  <span className="p-3 bg-cream border border-secondary-200 text-primary-600 group-hover:bg-primary-600 group-hover:text-cream group-hover:border-primary-600 transition-all duration-300">
                    <ContactIcon.phone className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-crimson font-semibold text-secondary-900 mb-1">
                      Telephone
                    </h4>
                    <p className="text-secondary-600 group-hover:text-primary-700 transition-colors">
                      {contactDetails.phone}
                    </p>
                  </div>
                </a>
              </div>

              <DividerLine variant="stitched" />

              <div>
                <h4 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-500 mb-5">
                  Follow Along
                </h4>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <MagneticElement key={social.name} strength={0.3}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-cream border border-secondary-200 hover:border-primary-500 hover:bg-primary-50 text-secondary-600 hover:text-primary-700 transition-all duration-300 flex items-center justify-center"
                          aria-label={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      </MagneticElement>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          <motion.form
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: showInfo ? 30 : 0, y: showInfo ? 0 : 30 }
            }
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className={cn(
              "bg-cream border border-secondary-200 p-8 md:p-10",
              showInfo ? "lg:col-span-7" : "",
            )}
          >
            <h3 className="font-crimson text-xs tracking-[0.3em] uppercase text-secondary-500 mb-8">
              Send a Message
            </h3>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />

              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your message..."
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                showArrow
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="inline-block w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
