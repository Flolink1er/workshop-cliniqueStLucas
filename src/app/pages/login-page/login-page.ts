import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserAccountService } from 'models/services/user-account.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private readonly userAccount: UserAccountService = inject(UserAccountService);

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required),
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

  public logValidators(fieldName: string) {
    console.log(this.loginForm.get(fieldName)?.validator?.({} as AbstractControl));
  }
}
