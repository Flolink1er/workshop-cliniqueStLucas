import { Component, inject, input, InputSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cta } from 'interfaces/home-data';
import { ApiService } from 'models/services/api.service';
import { ContactForm } from 'pages/contact/contact';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hero.html',
})
export class Hero {
  private readonly _api: ApiService = inject(ApiService);

  public readonly tag: InputSignal<string | undefined> = input<string>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly subtitle: InputSignal<string | undefined> = input<string>();
  public readonly actions: InputSignal<Cta[] | undefined> = input<Cta[]>();
  public readonly searchField: InputSignal<FormControl<string | null> | undefined> =
    input<FormControl<string | null>>();
  public readonly contactForm: InputSignal<FormGroup<ContactForm> | undefined> =
    input<FormGroup<ContactForm>>();
  public readonly background: InputSignal<string | undefined> = input<string>();

  public contactFormSubmit() {
    const body = {
      email: this.contactForm()!.value.email!,
      firstName: this.contactForm()!.value.firstName!,
      lastName: this.contactForm()!.value.lastName!,
      message: this.contactForm()!.value.message!,
      subject: this.contactForm()!.value.subject!,
    };

    this._api.sendData('contact', body).subscribe(res => console.log(res));
  }
}
