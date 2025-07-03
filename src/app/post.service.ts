import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts$ = new BehaviorSubject<IPost[]>([]);
  private API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  getPosts() {
    return this.posts$.asObservable();
  }

  fetchPosts() {
    this.http.get<IPost[]>(this.API_URL).subscribe(data => {
      const sorted = data.sort((a, b) => b.id - a.id) //sorting so the newest or hightest id num is at the top
      this.posts$.next(sorted);
    });
  }
  //Omit<Type, Key> Type is post and omitting the key 'id' because the api will generate one
  addPost(newPost: Omit<IPost, 'id'>) {
    this.http.post<IPost>(this.API_URL, newPost).subscribe(response => {
      const updated = [response, ...this.posts$.value];
      this.posts$.next(updated);
    });
  }
}
