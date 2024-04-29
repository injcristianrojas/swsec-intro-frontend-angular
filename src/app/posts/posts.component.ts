import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  postForm = new FormGroup({
    mensaje: new FormControl('')
  });
  invalid: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.api.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  insertPost(message: string): void {
    this.api.insertPost(message).subscribe(
      data => {
        this.getPosts();
        this.postForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.invalid = this.postForm.status == 'INVALID';
    if (!this.invalid)
      this.insertPost(this.postForm.value.mensaje);
  }

}
