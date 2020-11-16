import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../../shared/services/utils.service";
import {SessionService} from "../../shared/services/session.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public _utilService: UtilsService,
              public _sessionService: SessionService) { }

  ngOnInit(): void {
  }

}
