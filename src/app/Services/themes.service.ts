import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private themes = [
    { name:"frozen", color: "#D95A2B", textColor: "#D95A2B", border: "5px solid #D95A2B", background:"white", divBackground: "#508BBF"}, 
    { name:"spiderman", color: "#D92332", textColor: "#FCFCFC", border: "5px solid #D92332", background:"#0D0D0D", divBackground: "#0D0D0D"}
  ];

  private theme = new BehaviorSubject <any>(localStorage.getItem('theme'));

  constructor() {
    let th = localStorage.getItem('theme');

    if(!th)
      this.theme.next(JSON.stringify(this.themes.find((th) => {return th['name'] === "frozen"})));
    else
      this.theme.next(localStorage.getItem('theme'));

    console.log("alaa");
    
  }

  set_theme(theme_name:string) {
    localStorage.setItem('theme',JSON.stringify(this.themes.find((th) => {return th['name'] === theme_name})));
    this.theme.next(localStorage.getItem('theme'));
  }

  get_theme(){   
    return (this.theme);
  }

  get_all_themes(){
    let themes_names = (this.themes.map((th) => {return th['name']}));
    return (themes_names);
  }
}