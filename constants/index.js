import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

// Navigation Links
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Book", href: "/book" },
  { name: "Contact", href: "/contact" },
];

// Social Media Links
export const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/tomsampson",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/tomsampson",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tomsampson",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/tomsampson",
    icon: Facebook,
  },
];

export const contactDetails = {
  email: "contact@tomsampson.com",
  phone: "+44 123 456 7890",
  icons: {
    email: Mail,
    phone: Phone,
  },
};

// Author Bio
export const authorBio = {
  name: "Tom Sampson",
  title: "Former International Tennis Player & Author",
  shortBio:
    "Tom Sampson is a former international tennis player whose career has spanned multiple continents and countries. Having invested over £1,000,000 in his tennis career, he possesses a deep, firsthand understanding of the professional tennis landscape.",
  fullBio: `Tom Sampson is a former international tennis player whose career has spanned multiple continents and countries. He has trained and travelled alongside some of the world's top 100 players, including three ATP top 10 competitors—one of whom reached world number one.

Having invested over £1,000,000 in his tennis career and devoted countless hours both on and off the court, Tom possesses a deep, firsthand understanding of the professional tennis landscape and what it truly takes to reach an elite level.

Beyond tennis, Tom now runs multiple businesses across different countries, yet remains firmly embedded in the competitive side of the sport. He holds the highest internationally recognised qualification as a Tennis Director and is currently a senior coach working closely with the LTA. Based near Manchester, UK, he plays a key role in identifying and developing the next generation of top tennis players.`,
  stats: [
    { value: "20+", label: "Years Experience" },
    { value: "£1M+", label: "Invested in Career" },
    { value: "3", label: "Top 10 Players Trained With" },
    { value: "100+", label: "Countries Visited" },
  ],
  achievements: [
    "Trained with three ATP Top 10 players",
    "Over £1,000,000 invested in tennis career",
    "Highest internationally recognised Tennis Director qualification",
    "Senior coach working with the LTA",
    "Runs multiple businesses across different countries",
    "Key role in developing next generation of top players",
  ],
};

export const bookInfo = {
  title: "A Handful of Promise",
  subtitle: "The Insider's Guide to Professional Tennis",
  author: "Tom Sampson",
  coverImage: "/imgs/book-cover.jpg",
  bookImage: "/imgs/book.jpg",
  buyLink: "/",
  shortDescription:
    "An unflinching look at the realities of pursuing a professional tennis career, from family decisions and financial pressures to the personal sacrifices required to become the best player possible.",
  fullDescription: `In his book, Tom details the harsh realities of pursuing a tennis career, from family decisions and financial pressures to the personal sacrifices required to become the best player possible.

He also offers vital guidance for new parents and players on how to spot common pitfalls and navigate this unforgiving world. The book includes a comprehensive guide to finding the best training setup while minimising wasted time and money—insights that have been read, endorsed, and agreed upon by former professional players and some of the world's top trainers.`,
  keyTopics: [
    {
      title: "Family Decisions",
      description: "Navigate the complex family dynamics of pursuing tennis",
    },
    {
      title: "Financial Pressures",
      description: "Understand the true cost of a professional tennis career",
    },
    {
      title: "Personal Sacrifices",
      description: "Learn what it truly takes to reach the elite level",
    },
    {
      title: "Training Setup",
      description: "Find the best training while minimising wasted resources",
    },
    {
      title: "Common Pitfalls",
      description: "Avoid the mistakes that derail promising careers",
    },
    {
      title: "Expert Insights",
      description: "Wisdom endorsed by top players and trainers worldwide",
    },
  ],
  chapters: [
    "The Dream Begins",
    "The Financial Reality",
    "Family Dynamics",
    "Finding the Right Coach",
    "Training Abroad",
    "The Mental Game",
    "Navigating Tournaments",
    "The Path Forward",
  ],
};

export const testimonials = [
  {
    id: 1,
    quote:
      "This book opened my eyes to the realities of professional tennis. A must-read for any aspiring player or tennis parent considering this path.",
    author: "James Mitchell",
    role: "Former ATP Player",
    avatar: null,
  },
  {
    id: 2,
    quote:
      "Tom's insights are invaluable. He doesn't sugarcoat the journey but provides a realistic roadmap for those serious about the sport.",
    author: "Sarah Williams",
    role: "Tennis Academy Director",
    avatar: null,
  },
  {
    id: 3,
    quote:
      "Finally, someone telling the truth about what it takes. This book could save families thousands of pounds and years of misdirection.",
    author: "Michael Chen",
    role: "Sports Performance Coach",
    avatar: null,
  },
  {
    id: 4,
    quote:
      "As a tennis parent, I wish I had this book years ago. The financial guidance alone is worth its weight in gold.",
    author: "Emma Thompson",
    role: "Tennis Parent",
    avatar: null,
  },
  {
    id: 5,
    quote:
      "Tom's experience shines through every page. This is the definitive guide to navigating the professional tennis world.",
    author: "David Rodriguez",
    role: "Junior Tennis Coach",
    avatar: null,
  },
];

export const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Book", href: "/book" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export const galleryImages = [
  { id: 1, src: "/imgs/author/1.jpg", alt: "Tom Sampson - Tennis Career" },
  { id: 2, src: "/imgs/author/2.jpg", alt: "Tom Sampson - Coaching" },
  { id: 3, src: "/imgs/author/3.jpg", alt: "Tom Sampson - Training" },
  { id: 4, src: "/imgs/author/4.jpg", alt: "Tom Sampson - Competition" },
  { id: 5, src: "/imgs/author/5.jpg", alt: "Tom Sampson - Professional" },
  { id: 6, src: "/imgs/author/6.jpg", alt: "Tom Sampson - Author" },
];

export const ctaContent = {
  heading: "Ready to Navigate the World of Professional Tennis?",
  subheading:
    "Get your copy today and discover the insights that could change your tennis journey forever.",
  buttonText: "Buy Now",
  buttonLink: "/",
};

export const pageHeroes = {
  about: {
    title: "About Tom Sampson",
    subtitle:
      "Former international tennis player, coach, and author sharing decades of experience",
  },
  book: {
    title: "A Handful of Promise",
    subtitle:
      "The definitive guide to navigating the professional tennis world",
  },
  contact: {
    title: "Get in Touch",
    subtitle:
      "Have questions about the book or interested in coaching? Reach out today.",
  },
};
