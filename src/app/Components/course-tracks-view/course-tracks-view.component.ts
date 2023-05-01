import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/Services/themes.service';
import { Router } from '@angular/router';
import { TrackService } from 'src/app/Services/track.service';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-course-tracks-view',
  templateUrl: './course-tracks-view.component.html',
  styleUrls: ['./course-tracks-view.component.css']
})
export class CourseTracksViewComponent implements OnInit {
  
  theme:any;

  track_id:any;
  track:any = {};

  background_img_url = "";

  constructor(private _router:Router, private theme_service: ThemeService, private myService: CourseService, private track_service: TrackService, activated: ActivatedRoute){
    this.track_id = activated.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.track_service.get_track_by_id(this.track_id).subscribe({
      next: (data) => {
        this.track = data;
        this.set_courses_theme_images(); 
      },
      error: (err) => {
        alert(err);
      }
    });

    
    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = JSON.parse(data);
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/courses_tracks_bg.jpg";
        this.set_courses_theme_images();
      }
    });
  }

  start_course(course_id:any){
    this._router.navigate([`courses/${course_id}/lessons`])
  }

  set_courses_theme_images(){
    this.track.courses.map((course:any) => {
      let course_img = course.course_Img.find((img:any) => {return img.includes(this.theme.name)}); 
      course.theme_img = course_img;
    })
  }
}