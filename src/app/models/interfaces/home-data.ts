interface Cta {
  label: string;
  href: string;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
}

export interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    cta: Cta;
    ctaSecondary: Cta;
  };
  stats: Stat[];
  sections: Section[];
}
