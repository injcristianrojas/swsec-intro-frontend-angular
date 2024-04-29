import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.api.isSessionOpen();
  }

  logout(): void{
    this.api.removeToken();
  }

}
