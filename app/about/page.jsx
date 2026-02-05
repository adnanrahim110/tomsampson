import DetailedBio from "@/components/about/DetailedBio";
import CTA from "@/components/shared/CTA";
import ContactForm from "@/components/shared/ContactForm";
import Gallery from "@/components/shared/Gallery";
import PageHero from "@/components/shared/PageHero";
import { pageHeroes } from "@/constants";

export const metadata = {
  title: "About Tom Sampson | A Handful of Promise",
  description:
    "Learn about Tom Sampson, former international tennis player, senior LTA coach, and author of 'A Handful of Promise'.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={pageHeroes.about.title}
        subtitle={pageHeroes.about.subtitle}
      />
      <DetailedBio />
      <Gallery
        title="The Journey in Pictures"
        subtitle="Moments from Tom's tennis career and coaching journey"
        chapterNumber="II"
      />
      <CTA />
      <ContactForm />
    </>
  );
}
