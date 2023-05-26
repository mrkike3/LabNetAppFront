import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseDto } from 'src/app/models/response';


import{User} from 'src/app/models/user'
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  ngOnInit(): void {
  }


  formUser: FormGroup;

  constructor(
    private formB: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) { 

    this.formUser = this.formB.group({
      mail: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]],
      idRole: ['', Validators.required]
  
  });

  }


  addUser(): void {
    if (this.formUser.valid) {
      const newUser: User = {
        Email: this.formUser.value.mail,
        Password: this.formUser.value.password,
        IdRole: this.formUser.value.idRole,
        IsActive: true
      };

      this._userService.addUser(newUser).subscribe(
        (response: User) => {
         
          this._snackBar.open('Usuario agregado correctamente', 'Cerrar', {
            duration: 2000
          });
        },
        (error: any) => {
       
          this._snackBar.open('Error al agregar usuario', 'Cerrar', {
            duration: 2000
          });
        }
      );
    } else {

    }
  }
}


