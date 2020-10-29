import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../shared/services/utils.service';
import {SessionService} from '../../shared/services/session.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  constructor(public _utilService: UtilsService,
              public _sessionService: SessionService) {
  }
  ngOnInit(): void {
  }

}
