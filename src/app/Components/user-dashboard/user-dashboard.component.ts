import { Component,OnInit } from '@angular/core';
import{Chart,registerables} from 'node_modules/chart.js';
import { EnrolledCoursesService } from 'src/app/Services/enrolled-courses.service';
import { EnrolledTracksService } from 'src/app/Services/enrolled-tracks.service';

Chart.register(...registerables)

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userId:any=localStorage.getItem('userId')
  courses:{name:string,percentComplete:string}[]=[]

   tracks:{name:string,percentComplete:string}[]=[]
   
   studentCourses:any=[]
   console.log("hadeer1kml")
  //  totalMinOfCourseLessons:any=0
  //  listenedMinOfCourseLessons:any=0

   studentTracks:any=[]
  //  totalMinOfTrackLessons:any=0
  //  listenedMinOfTrackLessons:any=0

   constructor(private myService:EnrolledCoursesService,private EnrollrdTracksService:EnrolledTracksService){}

   ngOnInit(): void {
    // **********************************this section to get student courses and draw it's chart**********************************//
     //********to get student courses********//
   
    this.myService.getStudentCourses(this.userId).subscribe(
    (response)=>{
      console.log(response)
      response.map((field:any)=>{
        this.studentCourses.push(field.course)
        let totalMinOfCourseLessons=0
        let listenedMinOfCourseLessons=0
        field.lessons.map((lesson:any)=>{
          if(lesson.done==true)
          {
            listenedMinOfCourseLessons+=Number(lesson.duration)
          }
          totalMinOfCourseLessons+=Number(lesson.duration)
        })
        // console.log(listenedMinOfCourseLessons)
        // console.log(totalMinOfCourseLessons)
         this.courses.push({name:field.course.name,percentComplete:((listenedMinOfCourseLessons/totalMinOfCourseLessons)*100).toFixed(0)})
        //  console.log(this.courses)
      })

      //********to draw chart of courses********//
        this. drawCoursesChart()
      });


      this.EnrollrdTracksService.getStudentTrack(this.userId).subscribe((response)=>{
        console.log(response)
        response.map((field:any)=>{
          this.studentTracks.push(field.tracks[0].name)
        let  totalMinOfTrackLessons=0
         let listenedMinOfTrackLessons=0
          field.lessons.map((lessons:any)=>{
            lessons.map((lesson:any)=>{
              if(lesson.done==true)
              {
                listenedMinOfTrackLessons+=lesson.duration;
              }
              totalMinOfTrackLessons+=lesson.duration
            })
          })
          this.tracks.push({name:field.tracks[0].name,percentComplete:((listenedMinOfTrackLessons/totalMinOfTrackLessons)*100).toFixed(0)})

        })
        console.log(this.studentTracks)
        this.drawTrackChart()
      })
    } 
    
    
  drawCoursesChart()
  {
    const canvas1 = document.getElementById('myChart1') as HTMLCanvasElement;
    const ctx1 = canvas1?.getContext('2d');
    const courseNames = this.courses.map(course=> course?.name);
    const percentages = this.courses.map(course => course?.percentComplete);
    if (canvas1 && ctx1){
      const chart = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: courseNames,
          datasets: [{
            label: 'Course Progress By Percentages %',
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: 'Arial',
                  size: 13,
                },
                color: 'white'
              }
            }    ,
            x: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: 'Arial',
                  size: 13,
                },
                color: 'white'
              }
            }    
          },
          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
    } 

  }  

  drawTrackChart()
  {
    const canvas2 = document.getElementById('myChart2') as HTMLCanvasElement;
    const ctx2 = canvas2?.getContext('2d');

    const tracksNames = this.tracks.map(track=> track.name);
    const percentages2 = this.tracks.map(track => track.percentComplete);
    if (canvas2 && ctx2){
      const chart = new Chart(ctx2, {
        type: 'line',
        data: {
          labels:tracksNames,
          datasets: [{
            label: 'track Progress By Percentages %',
            data: percentages2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: 'Arial',
                  size: 13,
                },
                color: 'white'
              }
            }    ,
            x: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: 'Arial',
                  size: 13,
                },
                color: 'white'
              }
            }    
          },
          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }
      })
    }
  }
}
    
        



  // console.log(this.studentCourses)
    // console.log(this.courses)
  // **********************************this section to get student courses and draw it's chart**********************************//
     //********to get student courses********//
    //  this.studentCourses=response.courses_Enrolled
    //  this.studentCourses.map((course:any)=>{
    //   course.lessons.map((lesson:any)=>{
    //     if(lesson.done==true)
    //     {
    //       this.listenedMinOfCourseLessons+=Number(lesson.duration)
    //     }
    //     this.totalMinOfCourseLessons+=Number(lesson.duration)
    //   })
    //   this.courses.push({name:course.name,percentComplete:((this.listenedMinOfCourseLessons/this.totalMinOfCourseLessons)*100).toFixed(0)})
    //   })
    //   console.log(this.courses)
      //********to draw chart of courses********//
      // this. drawCoursesChart()

   // **********************************this section to get student tracks and draw it's chart**********************************//
      //********to get student courses********//
      // this.studentTracks=response.tracks_Enrolled
      // this.studentTracks.map((track:any)=>{
      //  track.courses.map((course:any)=>{
      //     course.lessons.map((lesson:any)=>{
      //       if(lesson.done==true)
      //       {
      //         this.listenedMinOfTrackLessons+=(lesson.duration)
      //       }
      //       this.totalMinOfTrackLessons+=(lesson.duration)
      //     })
      //   })
      //   this.tracks.push({name:track.name,percentComplete:((this.listenedMinOfTrackLessons/this.totalMinOfTrackLessons)*100).toFixed(0)})
      //   console.log(this.tracks)
        //********to draw chart of Tracks********//
  //       this.drawTrackChart()
  //     })
  //     },
  //     (err)=>{
  //       console.log(err)
  //     })
  // }

//   drawCoursesChart()
//   {
//     const canvas1 = document.getElementById('myChart1') as HTMLCanvasElement;
//     const ctx1 = canvas1?.getContext('2d');
//     const courseNames = this.courses.map(course=> course?.name);
//     const percentages = this.courses.map(course => course?.percentComplete);
//     if (canvas1 && ctx1){
//       const chart = new Chart(ctx1, {
//         type: 'bar',
//         data: {
//           labels: courseNames,
//           datasets: [{
//             label: 'Course Progress By Percentages %',
//             data: percentages,
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.6)',
//               'rgba(54, 162, 235, 0.6)',
//               'rgba(255, 206, 86, 0.6)',
//               'rgba(75, 192, 192, 0.6)',
//               'rgba(153, 102, 255, 0.6)',
//               'rgba(255, 159, 64, 0.6)'
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: {
//                 font: {
//                   family: 'Arial',
//                   size: 13,
//                 },
//                 color: 'white'
//               }
//             }    ,
//             x: {
//               beginAtZero: true,
//               ticks: {
//                 font: {
//                   family: 'Arial',
//                   size: 13,
//                 },
//                 color: 'white'
//               }
//             }    
//           },
//           plugins: {
//             legend: {
//               labels: {
//                 color: 'white'
//               }
//             }
//           }
//         }
//       });
//     } 

//   }