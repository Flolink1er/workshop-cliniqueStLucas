import { FormControl } from '@angular/forms';

export interface ContactForm {
  email: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  message: FormControl<string | null>;
  subject: FormControl<string | null>;
}
