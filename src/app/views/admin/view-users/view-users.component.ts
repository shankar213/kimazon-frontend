import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  users: any[] = [];
  filteredUsers: any[] = [];
  filter: any = {};
  pageSize = 10;

  constructor(private _sessionService: SessionService,
              private _router: Router,
              private _userService: UserService,
              private _utilService: UtilsService,
              private cdRef: ChangeDetectorRef) {
  }

  elements: any = [];
  previous: any = [];
  headElements = ['id', 'role', 'firstname', 'lastname', 'email'];

  ngOnInit(): void {
    this.filter.role = 'ALL USERS';
    this.getUserData();
  }


  private getUserData() {
    this._userService.getUsers().subscribe((response: any) => {
      const data = response.data;
      if (!data || !data.users) {
        this._utilService.toast('Cannot Load Users! Try Again Later', 'Error!', 'error');
        return;
      }
      this.users = data.users;
      this.filteredUsers = this.users;
      this.mdbTable.setDataSource(this.filteredUsers);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.resetPager();
    });

  }

  resetPager() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.pageSize);
    this.mdbTablePagination.firstPage();
    this.cdRef.detectChanges();
  }

  onRoleSelected(role: any) {
    this.filteredUsers = this.users.filter(value => value.role === role);
    if (role === 'ALL USERS') {
      this.filteredUsers = this.users;
    }
    this.mdbTable.setDataSource(this.filteredUsers);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
    this.resetPager();
  }

}
