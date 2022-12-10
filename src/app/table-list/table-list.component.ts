import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/Authservice';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router) { }
  profileForm: FormGroup
  password =""
  ngOnInit() {

    this.profileForm = this.fb.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  Login() {
    //[disabled]="!profileForm.valid"
    console.log(this.profileForm.value,123456)
    var user = this.profileForm.get('user').value
    var pwd = this.profileForm.get('password').value
    this.authService.Login(user, pwd).then((data) => {
        this.router.navigate(['/dashboard']);
    }).catch((data) => {
      alert(data)
    },)
  }
}
