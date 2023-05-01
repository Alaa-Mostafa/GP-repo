import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // private readonly URL = "http://localhost:7000/api/students";
  //http://localhost:7000/api/enrollCoursess/644670d626f0fa6cb662a974
  //http://localhost:7000/api/enrollTrackss/6448f491b85621ff03f95d98

  private readonly URL = "http://localhost:7000/api/enrollCoursess";
  private readonly enroll_track_url = "http://localhost:7000/api/enrollTrackss";

  constructor(private readonly myClient: HttpClient) { }

  enroll_course(course_id:any, student_id:any, token:any) {

    let httpHeaders = new HttpHeaders({
      'student-id' : student_id,
      'x-auth-token': token
    });

    let options = {
      headers: httpHeaders
    };    

    return this.myClient.post(this.URL + "/" + course_id, "", options).subscribe();
  }

  // -------------------------------------------------------------------------------------------

  enroll_track(track_id:any, student_id:any, token:any) {

    let httpHeaders = new HttpHeaders({
      'student-id' : student_id,
      'x-auth-token': token
    });

    let options = {
      headers: httpHeaders
    };    

    return this.myClient.post(this.enroll_track_url + "/" + track_id, "", options).subscribe();
  }
}
