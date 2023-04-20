import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
  
  constructor(private theme_service: ThemeService){}

  theme:any;

  background_img_url = "";
  courses = ["JavaScript", "Security", "Testing", "Angular", "Android"]

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/courses_tracks_bg.jpg";
      }
    });
  }
}
