import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SessionService} from './services/session.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule
  ],
  providers: [SessionService]
})
export class SharedModule {
}
