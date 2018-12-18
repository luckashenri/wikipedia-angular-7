import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  response;
  term: string;
  searchForm = new FormGroup({
    term: new FormControl('')
  });

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.currentTerm.subscribe((term) => {
      this.searchForm.get('term').patchValue(term);
      this.term = term;
    });
    this.appService.currentResponse.subscribe((res) => {
      this.response = res;
    });
  }

  ngOnDestroy() {
    this.appService.clean();
  }

  doSearch() {
    this.appService.getResults(this.searchForm.get('term').value);
  }

}
