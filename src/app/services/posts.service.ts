import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../models/posts.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url}/posts`).pipe(
      map((data) => {
        const posts: Post[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: data[key].id });
        }
        return posts;
      })
    );
  }

  addPost(post: Post): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.url}/post`, post);
  }

  updatePost(post: Post) {
    const postData = {
      id: post.id,
      title: post.title,
      description: post.description,
    };
    return this.http.put<{ id: number }>(`${environment.url}/post`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`${environment.url}/post/${id}`);
  }
}
