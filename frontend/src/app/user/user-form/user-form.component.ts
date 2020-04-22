import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {


  subscriptions: Subscription = new Subscription();
  loading = false;
  loadingSend = false;
  form: FormGroup;
  user: User;
  errors;
  isSuccess = false;
  textHeader;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.minLength(3), Validators.required]],
      last_name: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email]],
      password: ['', null],
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.userId;
    if (userId !== undefined) {
      this.textHeader = 'Atualizar';
      this.loading = true;
      this.userService.getUser(userId).subscribe(
        data => {
          this.user = data;
          Object.keys(data).forEach(name => {
            if (this.form.controls[name]) {
              this.form.controls[name].setValue(data[name]);
            }
          });
          this.errors = null;
          this.loading = false;
        },
        error => {
          this.router.navigate(['/user/notfound']);
          this.errors = error;
          this.loading = false;
        }
      );
    } else {
      this.textHeader = 'Criar Novo';
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(3)]);
    }
  }

  submitForm() {
    this.errors = null;
    if (this.form.valid) {
      if (this.user) {
        this.updateUser();
      } else {
        this.createUser();
      }
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle.markAsTouched();
      });
    }

  }

  updateUser() {
    this.loadingSend = true;
    this.isSuccess = false;

    this.userService.updateUser(this.user.id, this.form.value).subscribe(
      data => {
        this.loadingSend = false;
        this.errors = null;
        this.showSuccessAlert();

      },
      error => {
        this.errors = error;
        this.loadingSend = false;
      }
    );
  }

  createUser() {
    this.loadingSend = true;
    this.isSuccess = false;
    this.userService.createUser(this.form.value).subscribe(
      data => {
        this.loadingSend = false;
        this.errors = null;
        this.showSuccessAlert();
        this.form.reset();

      },
      error => {
        this.errors = error;
        this.loadingSend = false;
      }
    );

  }


  verificaValidTouched(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  showSuccessAlert() {
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000);
  }

}
