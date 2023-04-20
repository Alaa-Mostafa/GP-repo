import { Component, OnInit } from '@angular/core';
import{ FormControl,FormGroup,Validators} from'@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service'; 
import { ThemeService } from 'src/app/Services/themes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private _AuthService:AuthService, private theme_service: ThemeService){
    this.registerForm=new FormGroup({
      'first_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      'last_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      // 'email':new FormControl(null,[Validators.required,Validators.email]),
      'email':new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+[a-zA-Z]/)]),
      'password':new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'confirm_password':new FormControl('',[Validators.required])
    },
    [this.passwordMatch('password','confirm_password')]
    )
  }

  theme:any;

  background_img_url = "";
  tracks_img = "";

  tracks = ["Frontend Development", "Backend Development", "Cyber Security", "Mobile Development", "Artificial Intelligence", "Testing"]

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/signup_login_bg.jpg";
      }
    });
  }

  passwordMatch(password:string,confirm_password:string){
   return function(form:AbstractControl){
      const passwordValue=form.get(password)?.value
      const confirmPasswordValue=form.get(confirm_password)?.value
      if(passwordValue === confirmPasswordValue){
        return null;
      }
      return{passwordMismatchError:true}
      }
    

  }
  submitForm(){
    // if(this.registerForm.invalid)
    // {
    //   return;
    // }
    // this._AuthService.register(this.registerForm.value).subscribe((data)=>{
    //   console.log(data)
    // })
    console.log(this.registerForm.value)
  }
}
