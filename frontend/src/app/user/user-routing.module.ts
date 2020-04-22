import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserGuard } from '../guards/user.guard';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivateChild: [UserGuard],
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: UserListComponent
            },
            {
                path: 'update/:userId',
                component: UserFormComponent
            },
            {
                path: 'create',
                component: UserFormComponent
            },
            {
                path: 'notfound',
                component: NotfoundComponent
            }
        ]

    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }
