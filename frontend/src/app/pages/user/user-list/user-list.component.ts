import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  loading = false;
  userList: User[];
  errors;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.add(
      this.userService.getUsers().subscribe(
        data => {
          this.errors = null;
          this.userList = data;
          this.loading = false;
        }, error => {
          this.errors = error;
          this.loading = false;
        }
      )
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
