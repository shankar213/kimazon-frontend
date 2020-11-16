import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from "../../../shared/services/session.service";
import {Router} from "@angular/router";
import {UtilsService} from "../../../shared/services/utils.service";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, AfterViewInit  {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  users: any[];
  filteredUsers: any[];
  filter: any = {};

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _utilService: UtilsService,
              private cdRef: ChangeDetectorRef) { }

  elements: any = [];
  previous: any = [];
  headElements = ['id', 'role', 'firstname', 'lastname', 'email'];

  ngOnInit(): void {
    // this.users = usersList.users;       uncomment later
    this.filteredUsers = this.users;
    this.mdbTable.setDataSource(this.filteredUsers);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onRoleSelected(role: any) {
    console.log(role);
    this.filteredUsers = this.users.filter(value => value.role === role);
    if (role === 'ALL USERS') {
      this.filteredUsers = this.users;
    }
    this.mdbTable.setDataSource(this.filteredUsers);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

}
