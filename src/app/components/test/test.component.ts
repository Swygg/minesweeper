import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { timestamp } from 'rxjs';
import { TimeSpan } from 'src/app/models/timeSpan.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  m1! : moment.Moment;
  m2! : moment.Moment;
  difference! : TimeSpan;

  constructor() {
  

  }


  ngOnInit(): void {
    this.difference = new TimeSpan(new Date("02/Feb/2022 18:11:00"), new Date())
  }

}
