import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = environment.base_api;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${this.api}user/`);
  }

  getUser(userId: number) {
    return this.http.get<User>(`${this.api}user/${userId}/`);
  }

  updateUser(userId: number, form: any) {
    return this.http.put<User>(`${this.api}user/${userId}/`, form);
  }
  createUser(form: any) {
    return this.http.post<User>(`${this.api}user/`, form);
  }
}
