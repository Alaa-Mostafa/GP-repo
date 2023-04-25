import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})

export class TracksComponent implements OnInit {
  constructor(private _router:Router, private theme_service: ThemeService){}

  theme:any;

  background_img_url = "";
  tracks_img = "";

  tracks = ["Frontend Development", "Backend Development", "Cyber Security", "Mobile Development", "Artificial Intelligence", "Testing"]

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/courses_tracks_bg.jpg";
      }
    });
  }

  view_track_details(){
    this._router.navigate([`tracks/5`])
  }
}