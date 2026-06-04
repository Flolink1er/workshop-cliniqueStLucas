import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormField } from 'components/form-field/form-field';
import { ContactForm, ContactResponse } from 'interfaces/contact.interface';
import { ActionLinks } from 'interfaces/home-data';
import { ApiService } from 'models/services/api.service';
import { ToastsService } from 'models/services/toasts.service';

@Component({
  selector: 'app-hero',
  imports: [ReactiveFormsModule, FormField, RouterLink, NgOptimizedImage],
  templateUrl: './hero.html',
})
export class Hero {
  private readonly _api: ApiService = inject(ApiService);
  private readonly _toast: ToastsService = inject(ToastsService);

  public readonly tag: InputSignal<string | undefined> = input<string>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly subtitle: InputSignal<string | undefined> = input<string>();
  public readonly actions: InputSignal<ActionLinks[] | undefined> = input<ActionLinks[]>();
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

    this._api.sendData('contact', body).subscribe({
      next: (res: ContactResponse): void => {
        if (res.success) this._toast.show('success', 'Message envoyé avec succès', res.message);
        else if (!res.success && res.message) this._toast.show('warning', 'Attention', res.message);
      },
      error: (err) => this._toast.show('error', 'Erreur', `Le message n'a pas pu être envoyé: ${err}`)
    });
  }

  public isRequired(fieldName: string): boolean {
    const validator = this.contactForm()
      ?.get(fieldName)
      ?.validator?.({} as AbstractControl);
    return validator && validator['required'];
  }
}
