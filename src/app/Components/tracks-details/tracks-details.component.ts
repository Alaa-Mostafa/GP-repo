import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/Services/themes.service';
import { TrackService } from 'src/app/Services/track.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-tracks-details',
  templateUrl: './tracks-details.component.html',
  styleUrls: ['./tracks-details.component.css']
})
export class TracksDetailsComponent implements OnInit {

  theme:any;
  background_img_url = "";

  track_id = "";
  track:any = {};
  track_img = "";
  courses_num:any = 0; 
  track_description:any = [];

  constructor(private theme_service: ThemeService, private myService: TrackService, 
    activated: ActivatedRoute, private _router:Router, private student_service:StudentService){
    this.track_id = activated.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.myService.get_track_by_id(this.track_id).subscribe({
      next: (data) => {
        this.track = data;
        this.courses_num = this.track.courses.length; 
        this.track_description = this.track.description.split('$');

        this.set_track_theme_image();
      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = JSON.parse(data);
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/background.jpg";
        this.set_track_theme_image();
      }
    });
  }

  set_track_theme_image(){
    this.track_img  = this.track.track_Img.find((img:any) => {return img.includes(this.theme.name)});
  }

  enroll_track() {

    let user_token:any = localStorage.getItem('userToken');

    if(!user_token)
      this._router.navigate([`login`]);

    var decoded_token:any = jwt_decode(user_token);   
    this.student_service.enroll_track(this.track_id, decoded_token.user_id, user_token);

    alert("Enrolled Successfully!");

    this._router.navigate([`courses/${this.track_id}/courses`])
  }
}
