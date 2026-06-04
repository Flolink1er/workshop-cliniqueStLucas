import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from 'components/hero/hero';
import { ContactForm } from 'interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Hero],
  templateUrl: './contact-page.html',
})
export class ContactPage {
  public readonly contactForm: FormGroup<ContactForm> = new FormGroup<ContactForm>({
    email: new FormControl<string | null>('', [Validators.email, Validators.required]),
    firstName: new FormControl<string | null>('', Validators.required),
    lastName: new FormControl<string | null>('', Validators.required),
    message: new FormControl<string | null>('', [Validators.required, Validators.minLength(20)]),
    subject: new FormControl<string | null>('Demande de renseignement', Validators.required),
  });
}
