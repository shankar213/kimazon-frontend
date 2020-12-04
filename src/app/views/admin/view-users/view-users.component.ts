import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../shared/services/session.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../shared/services/utils.service';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {UserService} from '../../../shared/services/user.service';
import {Product} from '../../../shared/models/Product';
import {APP_CONSTANTS} from '../../../shared/constants/app-constants';
import {User} from '../../../shared/models/User';

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


  suspendOrUnsuspendUser(user: User) {
    const updateData = {user: {is_suspended: !user.is_suspended}};
    this._userService.updateUserProfile(updateData, user.id).subscribe(response => {
      const data = response[APP_CONSTANTS.FIELD_DATA];
      if (data && data.user) {
        this._utilService.toast(response.status_msg, user.is_suspended ? 'Activated!' : 'Suspended!');
      } else if (!data.product && response[APP_CONSTANTS.FIELD_ERRORS]) {
        this._utilService.toast(response[APP_CONSTANTS.FIELD_ERRORS], 'Error!', 'error');
      } else if (!data.product && data.error) {
        this._utilService.toast(data.message, 'Error!', 'error');
      } else {
        this._utilService.toast('Something Went Wrong! Try Again Letter', 'Error!', 'error');
      }
      this.getUserData();
    });
  }

}
