import { Component,OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';

@Component({
  selector: 'app-tracks-details',
  templateUrl: './tracks-details.component.html',
  styleUrls: ['./tracks-details.component.css']
})
export class TracksDetailsComponent implements OnInit {

  theme:any;
  background_img_url = "";
  constructor(private theme_service: ThemeService){}

  ngOnInit(): void {
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = data;
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/background.jpg";
      }
    });
  }
}
