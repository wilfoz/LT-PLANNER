import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserModel } from './model/user.model';
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  login(payload: { email: string, password: string }) {
    const { email, password } = payload;
    const url = `${this.BASE_URL}/login`;
    return this.http.post<any>(url, { email, password });
  }

  register(payload: UserModel): Observable<UserModel> {
    const { name, email, password } = payload;
    const url = `${this.BASE_URL}/user`;
    return this.http.post<UserModel>(url, { name, email, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
