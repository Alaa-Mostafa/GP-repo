import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrolledTracksService {

  constructor(private mthttp:HttpClient) { }

  getStudentTrack(studentId:any):Observable<any>
  {
    let token:any = localStorage.getItem('userToken');

    let httpHeaders = new HttpHeaders({
      'student-id' : studentId,
      'x-auth-token': token
    });

    let options = {
      headers: httpHeaders
    };

   return this.mthttp.get(`http://localhost:7000/api/getStudentTracks/${studentId}`, options);
  }
}
