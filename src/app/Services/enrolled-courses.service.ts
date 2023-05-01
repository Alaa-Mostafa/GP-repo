import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrolledCoursesService {
    //private URL = "http://localhost:7000/api/enrollCoursess";
    constructor(private myClient: HttpClient) { }

    getStudentCourses(studentId:any):Observable<any>
    {
      let token:any = localStorage.getItem('userToken');

      let httpHeaders = new HttpHeaders({
        'student-id' : studentId,
        'x-auth-token': token
      });
  
      let options = {
        headers: httpHeaders
      };    

      return this.myClient.get(`http://localhost:7000/api/getStudentCourses/${studentId}`, options);
    }
}
