import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { APP_CONSTANTS } from '../../../shared/constants/app-constants';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    user_email: string;

    constructor(private _authService: AuthService,
                private _utilService: UtilsService) {
    }

    ngOnInit(): void {
    }

    sendEmail() {
        if (!this.user_email.length) {
            this._utilService.toast('Please Enter you Email ', 'Focus!!', 'error');
            return;
        }

        this._authService.sendPasswordResetEmail({email: this.user_email}).subscribe((res: any) => {

            if (res[APP_CONSTANTS.FIELD_DATA].email_sent) {
                this._utilService.toast('We have send you an Email with Temporary Password ', 'Email Sent Successfully');
            } else if (res.errors) {
                this._utilService.toast('Error', res.errors.error_message, 'error');
            } else {
                this._utilService.toast('Something Went Wrong', 'Unable to send Email now, Try again later', 'error');
            }
        });
    }

}
