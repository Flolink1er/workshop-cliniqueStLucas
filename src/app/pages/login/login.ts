import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // public login = async (email: string, password: string) => {
  //   return await fetch('http://localhost:5150/api/patients/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       localStorage['token'] = data.token;
  //     })
  // }

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
      .then((res) => {
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => console.error(err));
  }
}
