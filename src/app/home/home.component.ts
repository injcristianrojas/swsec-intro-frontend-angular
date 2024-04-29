import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  login(username:string, password:string): void {
    this.api.login(username, password).subscribe(
      (response) => {
        this.api.handleAuthentication(response)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  isSessionOpen(): boolean {
    return this.api.isSessionOpen();
  }

  onSubmit(): void {
    this.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
  }

}
