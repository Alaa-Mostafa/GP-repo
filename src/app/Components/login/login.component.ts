import { Component, OnInit } from '@angular/core';
import{ FormControl,FormGroup,Validators} from'@angular/forms';
// import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ThemeService } from 'src/app/Services/themes.service';
import { AuthService } from 'src/app/Services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private _AuthService:AuthService, private theme_service: ThemeService){
    this.loginForm=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      
    })
  }

  theme:any;

  background_img_url = "";

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/signup_login_bg.jpg";
      }
    });
  }

  submitForm(){
    // if(this.registerForm.invalid)
    // {
    //   return;
    // }
    // this._AuthService.register(this.registerForm.value).subscribe((data)=>{
    //   console.log(data)
    // })
    console.log(this.loginForm.value)
  }
}
