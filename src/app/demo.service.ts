import { Injectable } from '@angular/core';
import { Demo } from './demo';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DemoService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getDemos():  Promise<Demo[]> {
    return this.http.get(this.baseUrl + '/api/demos/')
      .toPromise()
      .then(response => response.json() as Demo[])
      .catch(this.handleError);
  }

  createDemo(demoData: Demo): Promise<Demo> {
    return this.http.post(this.baseUrl + '/api/demos/', demoData)
      .toPromise().then(response => response.json() as Demo)
      .catch(this.handleError);
  }

  updateDemo(demoData: Demo): Promise<Demo> {
    return this.http.put(this.baseUrl + '/api/demos/' + demoData.id, demoData)
      .toPromise()
      .then(response => response.json() as Demo)
      .catch(this.handleError);
  }

  deleteDemo(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/demos/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
