export interface ServiceData {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  phone: string;
  hours: string;
  departmentId: number | null;
}
