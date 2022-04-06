import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthReturnData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading=false;
  errorMsg:string=null;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    this.errorMsg = null;
    if(!form.valid){
      return;  
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs : Observable<AuthReturnData>;
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.signIn(email,password);
    }
    else{
      authObs = this.authService.signUp(email,password);
    }    
    form.reset();

    authObs.subscribe(response=>{
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },errorMsg=>{
      this.errorMsg = errorMsg;
      this.isLoading = false;
    });
  }

  onHandleError(){
    this.errorMsg = null; 
  }
}
