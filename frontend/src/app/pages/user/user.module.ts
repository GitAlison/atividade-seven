import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
