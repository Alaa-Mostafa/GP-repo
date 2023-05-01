import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly URL = "http://localhost:7000/api/lessons";

  constructor(private readonly myClient: HttpClient) { }

  get_lesson_by_id(lesson_id:any) {
    return this.myClient.get(this.URL + "/" + lesson_id);
  }
}
