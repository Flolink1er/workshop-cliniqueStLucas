import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAccountService } from 'models/services/user-account.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly userAccount: UserAccountService = inject(UserAccountService);

  public loginForm = new FormGroup({
    email: new FormControl('patient@clinique.be', [Validators.required, Validators.email]),
    password: new FormControl('Patient2026!', Validators.required),
  });

  public onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.userAccount.userLogin(email!, password!);
    }
  }

  public isRequired(fieldName: string): boolean {
    const validator = this.loginForm.get(fieldName)?.validator?.({} as AbstractControl);
    return validator && validator['required'];
  }
}
