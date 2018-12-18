import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results;
  searchForm = new FormGroup({
    term: new FormControl('')
  });

  constructor(private appService: AppService) {}

  ngOnInit() {}

  doSearch() {
    this.appService.getResults(this.searchForm.get('term').value);
    if (this.searchForm.get('term').value === '') {
      this.appService.clean();
    }
  }

}
