import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/course.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ThemeService } from 'src/app/Services/themes.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.css']
})
export class CoursesDetailsComponent implements OnInit {

  theme:any;
  background_img_url = "";

  course:any = {};
  course_id:any;
  course_img = "";

  hours:any;
  minutes:any;
  course_description:any = [];

  instructor:any = {};

  constructor(private theme_service: ThemeService, private readonly myService: CourseService, activated: ActivatedRoute, 
    private readonly inst_service: InstructorService, private _router:Router, private student_service:StudentService){
    
      this.course_id = activated.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.myService.get_course_by_id(this.course_id).subscribe({
      next: (data) => {
        this.course = data;
        this.course_description = this.course.description.split('$');

        this.hours = Math.floor(this.course.duration / 60);
        this.minutes = this.course.duration - (this.hours * 60);

        this.set_course_theme_image();

        // ====================== instructor
        this.inst_service.get_instructor_by_id(this.course.instructor._id).subscribe({
          next: (data) => {
            this.instructor = data;
          },
          error: (err) => {
            alert(err);
          }
        })

      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = JSON.parse(data);
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/background.jpg";
        this.set_course_theme_image();
      }
    });
  }

  set_course_theme_image(){
    this.course_img  = this.course.course_Img.find((img:any) => {return img.includes(this.theme.name)});
  }

  enroll_course() {

    let user_token:any = localStorage.getItem('userToken');

    if(!user_token)
      this._router.navigate([`login`]);

    var decoded_token:any = jwt_decode(user_token);   
    this.student_service.enroll_course(this.course_id, decoded_token.user_id, user_token);

    alert("Enrolled Successfully!");

    this._router.navigate([`courses/${this.course_id}/lessons`]);
  }
}