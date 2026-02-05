import { ScrollProgress } from "@/components/effects";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { PointerProvider } from "@/components/providers/PointerProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { cn } from "@/libs/cn";
import { Crimson_Pro, Open_Sans } from "next/font/google";
import "./globals.css";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-crimson",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Tom Sampson | A Handful of Promise",
  description:
    "Tom Sampson is a former international tennis player and author of 'A Handful of Promise' - the insider's guide to professional tennis.",
  keywords: [
    "Tom Sampson",
    "tennis",
    "professional tennis",
    "tennis coach",
    "A Handful of Promise",
    "tennis book",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(crimson.variable, openSans.variable, "antialiased")}>
        <SmoothScroll>
          <PointerProvider>
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
          </PointerProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
