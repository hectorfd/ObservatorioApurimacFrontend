import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule,   } from '@angular/forms'
import { ApiService } from '../../services/api.service';
import { LoginI } from '../../models/login.interface';
import { Router } from "@angular/router";
import { ResponseI } from "../../models/response.interface";
import { CommonModule } from '@angular/common'; // <-- Agrega esto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
  styleUrl: '../componentes dashboard/css/sb-admin-2.min.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
 })

 constructor(private api:ApiService, private router:Router){}
 //para las alertas
 errorStatus: boolean = false;
 errorMsj:any = '';

 ngOnInit(): void {
   this.checkLocalStorage();
 }

 checkLocalStorage(){
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    this.router.navigate(['/dashboard']);
  }
}


 onLogin(form: any){
  this.api.loginByEmail(form).subscribe(data => {
    let dataResponse: ResponseI = data;
    if(dataResponse.status == "ok"){
      localStorage.setItem("token",dataResponse.result.token);
      this.router.navigate(['dashboard']);
      console.log(data)
    }else{
      this.errorStatus = true;
      this.errorMsj = dataResponse.result.error_msg;
    }
  })
 }


}
