import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    token: string;
    passwordData: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.paramMap.get('token');
    }

    changePassword() {

    }
}
