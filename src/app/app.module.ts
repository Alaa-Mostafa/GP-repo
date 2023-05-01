import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import{HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TracksComponent } from './Components/tracks/tracks.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CoursesDetailsComponent } from './Components/courses-details/courses-details.component';
import { TracksDetailsComponent } from './Components/tracks-details/tracks-details.component';
import { LessonsViewComponent } from './Components/lessons-view/lessons-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseTracksViewComponent } from './Components/course-tracks-view/course-tracks-view.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard.component';
import { TestadmindashboardComponent } from './Components/testadmindashboard/testadmindashboard.component';
import { LayoutComponent } from './Components/layout/layout.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TracksComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CoursesDetailsComponent,
    TracksDetailsComponent,
    LessonsViewComponent,
    CourseTracksViewComponent,
    UserDashboardComponent,
    TestadmindashboardComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
