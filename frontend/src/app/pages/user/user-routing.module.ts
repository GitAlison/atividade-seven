import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserGuard } from 'src/app/guards/user.guard';


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
