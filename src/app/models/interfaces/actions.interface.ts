import { Cta } from './home-data';

export interface ActionLinks extends Cta {
  type?: 'router' | 'legacy' | undefined;
}
