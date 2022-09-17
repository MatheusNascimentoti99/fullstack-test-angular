import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
interface DataForm {
  description: string
}
@Injectable({
  providedIn: 'root'
})



export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getHello(): Observable<any> {
    return this.http.get(environment.apiHost + '/hello');
  }

  public getDate(): Observable<any> {
    return this.http.get(environment.apiHost + '/current-date');
  }
  public submitForm(data: DataForm): Observable<any> {
    return this.http.post(environment.apiHost + '/submit', data);
  }

}
