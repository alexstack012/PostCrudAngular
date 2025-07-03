import { Component } from '@angular/core';
import { IPost, PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: IPost[] = [];

  constructor(private postService: PostService){}

  ngOnInit() {
    this.postService.getPosts().subscribe(data => this.posts = data);
  }

  addPost(post: {userId: number; title: string; body: string}) {
    this.postService.addPost(post);
  }
}
