import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import {environment} from '../../environments/environment';


export interface AuthReturnData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}

    signUp(email:string,password:string){
        return this.http.post<AuthReturnData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseKey,
            {
                email,
                password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError),tap(response=>{
            this.handleAuthentication(response.email,response.idToken,response.refreshToken,+response.expiresIn);
        }));
    } 

    signIn(email:string,password:string){
        return this.http.post<AuthReturnData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseKey,
            {
                email,
                password,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError),tap(response=>{
            this.handleAuthentication(response.email,response.idToken,response.refreshToken,+response.expiresIn);
        }));
    } 

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);  
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null; 
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin(){
        const userData: {
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:Date
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(email:string,userId:string,token:string,expireIn:number){
        const expirationDate = new Date(new Date().getTime() + expireIn*1000);
        const user = new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expireIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }


    private handleError(errorRes:HttpErrorResponse){
            let errorMsg = "An error occured!";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_NOT_FOUND':
                    errorMsg = "There is no user record corresponding to this identifier.";
                    break;
                case 'INVALID_PASSWORD':
                    errorMsg = "The password is invalid or the user does not have a password.";
                    break;
                case 'USER_DISABLED':
                    errorMsg = "The user account has been disabled by an administrator.";
                    break;
                case 'EMAIL_EXISTS':
                    errorMsg = "The email address is already in use by another account.";
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMsg = "Password sign-in is disabled for this project.";
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMsg = "We have blocked all requests from this device due to unusual activity. Try again later.";
                    break;
            }
            return throwError(errorMsg);
    }
}