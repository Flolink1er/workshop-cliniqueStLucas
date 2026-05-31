export interface Cta {
  label: string;
  href: string;
}

export interface FlavouredCta extends Cta {
  data: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export interface Section {
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
