export interface Project {
  id: string;
  ref: string;
  title: string;
  tagline: string;
  description: string[];
  tech: string[];
  status?: string;
  category: string;
  url?: string;
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  projectOrDomain: string;
  period?: string;
  url?: string;
  description: string[];
  tech: string[];
}

export interface WorkPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    description?: string;
  }[];
}

export interface PassionItem {
  id: string;
  ref: string;
  title: string;
  tagline: string;
  paragraphs: string[];
  highlights: string[];
  icon: "UtensilsCrossed" | "BookOpen" | "Film" | "Atom";
  featuredNote?: string;
}

export interface ProfileContent {
  name: string;
  title: string;
  role: string;
  location: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export interface AboutContent {
  label: string;
  title: string;
  paragraphs: string[];
  profileSpec: { label: string; value: string }[];
  highlights: { key: string; val: string }[];
}

export interface ContactContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  links: { name: string; href: string; label: string; icon: string }[];
}

export interface PortfolioContent {
  profile: ProfileContent;
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  experience: Experience[];
  howIWork: WorkPrinciple[];
  skills: SkillCategory[];
  passions: PassionItem[];
  contact: ContactContent;
}
