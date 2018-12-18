import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class Wiki {
  constructor(
      public title?: string,
      public description?: string,
      public link?: string,
  ) {
  }
}

@Injectable()
export class AppService {
  private responseSource = new BehaviorSubject<any>([]);
  currentResponse = this.responseSource.asObservable();
  private termSource = new BehaviorSubject<string>('');
  currentTerm = this.termSource.asObservable();
  response = [];
  obj: Wiki[] = [];

  constructor (private http: HttpClient) {}

  getResults(term: string) {
    this.changeTerm(term);
    this.clean();
    this.http.get('/w/api.php?action=opensearch&search=' + term + '&limit=10&format=json').subscribe((res) => {
      this.response.push(res[1]);
      this.response.push(res[2]);
      this.response.push(res[3]);
      for (let i = 0; i < this.response[1].length; i++) {
        this.addNew(this.response[0][i], this.response[1][i], this.response[2][i]);
      }
      this.responseSource.next(this.obj);
    });
  }

  changeTerm(term: string) {
    this.termSource.next(term);
  }

  addNew(title: string, desc: string, link: string) {
    this.obj.push({
      'title': title,
      'description': desc,
      'link': link
    });
  }

  clean() {
    this.responseSource.next([]);
    this.obj = [];
    this.response = [];
  }

}
