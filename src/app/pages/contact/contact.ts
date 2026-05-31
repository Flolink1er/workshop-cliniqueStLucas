import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from 'components/hero/hero';

export interface ContactForm {
  email: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  message: FormControl<string | null>;
  subject: FormControl<string | null>;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Hero],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  public readonly contactForm = new FormGroup<ContactForm>({
    email: new FormControl<string | null>('', [Validators.email, Validators.required]),
    firstName: new FormControl<string | null>('', Validators.required),
    lastName: new FormControl<string | null>('', Validators.required),
    message: new FormControl<string | null>('', Validators.required),
    subject: new FormControl<string | null>('', Validators.required),
  });
}
