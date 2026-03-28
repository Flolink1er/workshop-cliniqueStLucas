import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private _router: Router = inject(Router);

  public loginForm = new FormGroup({
    email: new FormControl('patient@clinique.be', Validators.required),
    password: new FormControl('Patient2026!', Validators.required),
  });

  public async login(email: string, password: string): Promise<void> {
    return await axios
      .post(
        'http://localhost:5150/api/patients/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        localStorage.setItem('token', res.data.token);
        this._router.navigate(['']);
      })
      .catch(err => console.error(err));
  }
}
