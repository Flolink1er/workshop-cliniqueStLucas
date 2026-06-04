import { CategoryActu, Tags } from 'enums/news.enum';

export interface ActualitesData {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: CategoryActu;
  author: string; //en attendant un type pour personnel medical/département,
  publishedAt: Date;
  image: string; //url sous format string ? à changer si besoin,
  tags: Tags[];
}
