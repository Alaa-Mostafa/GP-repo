import { Component,OnInit } from '@angular/core';
import { ThemeService } from 'src/app/Services/themes.service';
import { CourseService } from 'src/app/Services/course.service';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/Services/lesson.service';

@Component({
  selector: 'app-lessons-view',
  templateUrl: './lessons-view.component.html',
  styleUrls: ['./lessons-view.component.css']
})
export class LessonsViewComponent implements OnInit {

  theme:any;
  background_img_url = "";

  course:any = {};
  course_id:any;

  lessons:any = [];
  current_lesson:any = {};

  constructor(private theme_service: ThemeService, private readonly myService: CourseService, activated: ActivatedRoute, private readonly lesson_service: LessonService){
    this.course_id = activated.snapshot.params["id"];
  }

  ngOnInit(): void {

    this.myService.get_course_by_id(this.course_id).subscribe({
      next: (data) => {
        this.course = data; 

        // ====================== lessons
        this.course.lessons.map((lesson:any) => {
          this.lesson_service.get_lesson_by_id(lesson._id).subscribe({
            next: (data) => {
              this.lessons.push(data);
              this.current_lesson = this.lessons[0];  
            },
            error: (err) => {
              alert(err);
            }
          })
        })
      },
      error: (err) => {
        alert(err);
      }
    });

    this.theme_service.get_theme().subscribe({
      next:(data) => {
        this.theme = JSON.parse(data);
        this.background_img_url = "assets/themes/" + this.theme['name'] + "/lessons_bg.jpg";
      }
    });
  }

  view_lesson(lesson_id:any) {
    this.current_lesson = this.lessons.find((lesson:any) => {return lesson._id == lesson_id});
  }
}