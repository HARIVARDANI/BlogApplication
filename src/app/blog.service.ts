import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from './component/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'https://67bf55bdb2320ee050136b4c.mockapi.io/blogs'

  constructor(private httpClient : HttpClient) { }

  getBlogs(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }
 
  getBlogById(id: string): Observable<Blog> {
    return this.httpClient.get<Blog>(`${this.baseUrl}/${id}`);
  }
 
  addBlog(blog: Blog): Observable<any> {
    return this.httpClient.post<Blog>(this.baseUrl, blog);
  }
 

  updateBlog(id: string, blog: Blog): Observable<Blog> {
    return this.httpClient.put<Blog>(`${this.baseUrl}/${id}`, blog);
  }

  getMyBlogs(author: string): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(`${this.baseUrl}?author=${author}`);
  }

  addComment(blogId: string, blog: Blog): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${blogId}`, blog);
  } 

}
