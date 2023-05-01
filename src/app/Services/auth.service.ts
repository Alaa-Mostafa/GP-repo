import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

//import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject(null);
  // AdminRole:boolean=false
 

  constructor(private http:HttpClient,private _Router:Router) { 
    if(localStorage.getItem('userToken'))
    {
      this.saveUserData();
    }
   
  }

  saveUserData()
  {
    let encodedToken= JSON.stringify(localStorage.getItem('userToken')) ;
    let decodedToken:any=jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    console.log(this.userData)
    localStorage.setItem('userId',decodedToken.user_id);
    localStorage.setItem("AdminRole",decodedToken.adminRole)
    //console.log(decodedToken.adminRole)
  }
  register(registerData:any):Observable<any>
  {
   return this.http.post('http://localhost:7000/api/auth/signup',registerData)
  }
  
  login(loginData:any):Observable<any>
  {
   return this.http.post('http://localhost:7000/api/auth/login',loginData)
  }

  logout()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId')
    localStorage.removeItem('AdminRole')
    this.userData.next(null);
    this._Router.navigateByUrl('login')
  }
}