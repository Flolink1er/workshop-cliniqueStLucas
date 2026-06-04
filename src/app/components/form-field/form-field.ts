/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

type HTMLInputTypeAttributes = 'text' | 'date' | 'email' | 'password' | 'tel' | 'textarea';
type ValidatorTypeAttributes = 'required' | 'email' | 'minlength' | 'pattern';

@Component({
  selector: 'app-form-field[formControlName]',
  imports: [ReactiveFormsModule, LowerCasePipe, TitleCasePipe],
  templateUrl: './form-field.html',
})
export class FormField implements OnInit {
  private readonly ngControl: NgControl = inject(NgControl, { self: true });
  public readonly fieldName: InputSignal<string> = input.required<string>();
  public readonly fieldType: InputSignal<HTMLInputTypeAttributes> =
    input.required<HTMLInputTypeAttributes>();
  public readonly fieldHint: InputSignal<string | undefined> = input<string>();
  public readonly fieldValidators: InputSignal<ValidatorTypeAttributes[] | undefined> =
    input<ValidatorTypeAttributes[]>();

  public control!: FormControl;

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.control = this.ngControl.control as FormControl;
  }

  public writeValue(obj: object): void {}
  public registerOnChange(fn: any): void {}
  public registerOnTouched(fn: any): void {}
  public setDisabledState?(isDisabled: boolean): void {}

  public validatorHint(type: ValidatorTypeAttributes): string {
    switch (type) {
      case 'required':
        return 'Ce champ est requis.';
      case 'email':
        return 'Veuillez entrer une adresse email valide.';
      case 'pattern':
        return 'Veuillez respecter le format demandé.';
      case 'minlength':
        return 'Veuillez entrer un minimum de 20 caractère.';
      default:
        return '';
    }
  }

  public isRequired(): boolean {
    return !!this.fieldValidators()?.includes('required');
  }
}
