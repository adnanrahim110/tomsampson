import DetailedBookInfo from "@/components/book/DetailedBookInfo";
import CTA from "@/components/shared/CTA";
import ContactForm from "@/components/shared/ContactForm";
import PageHero from "@/components/shared/PageHero";
import { pageHeroes } from "@/constants";

export const metadata = {
  title: "A Handful of Promise | The Book by Tom Sampson",
  description:
    "Discover 'A Handful of Promise' - the insider's guide to professional tennis. Learn about the realities of pursuing a tennis career from someone who's lived it.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        title={pageHeroes.book.title}
        subtitle={pageHeroes.book.subtitle}
        backgroundPattern="dots"
      />
      <DetailedBookInfo />
      <CTA
        heading="Ready to Start Your Journey?"
        subheading="Get your copy of 'A Handful of Promise' and discover the truth about professional tennis."
      />
      <ContactForm
        title="Questions About the Book?"
        subtitle="Reach out if you have any questions or want to learn more about the book."
      />
    </>
  );
}
