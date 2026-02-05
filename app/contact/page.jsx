import ContactForm from "@/components/shared/ContactForm";
import PageHero from "@/components/shared/PageHero";
import { pageHeroes } from "@/constants";

export const metadata = {
  title: "Contact Tom Sampson | A Handful of Promise",
  description:
    "Get in touch with Tom Sampson. Have questions about the book, coaching, or speaking engagements? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={pageHeroes.contact.title}
        subtitle={pageHeroes.contact.subtitle}
        showScrollIndicator={false}
      />
      <ContactForm
        title="Send Us a Message"
        subtitle="Whether you have questions about the book, interested in coaching, or just want to say hello — we're here to help."
        showInfo={true}
      />
    </>
  );
}
