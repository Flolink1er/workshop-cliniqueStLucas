import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'models/services/api.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private _api: ApiService = inject(ApiService);
  public readonly contactForm = new FormGroup({
    email: new FormControl<string | null>('', [Validators.email, Validators.required]),
    firstName: new FormControl<string | null>('', Validators.required),
    lastName: new FormControl<string | null>('', Validators.required),
    message: new FormControl<string | null>('', Validators.required),
    subject: new FormControl<string | null>('', Validators.required),
  });

  public send() {
    const body = {
      email: this.contactForm.value.email!,
      firstName: this.contactForm.value.firstName!,
      lastName: this.contactForm.value.lastName!,
      message: this.contactForm.value.message!,
      subject: this.contactForm.value.subject!,
    };

    this._api.sendData('contact', body).subscribe(res => console.log(res));
  }
}
