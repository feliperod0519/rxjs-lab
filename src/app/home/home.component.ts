import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,shareReplay,tap } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { noop } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable} from 'rxjs';

import { environment } from '../../environments/environment';//'../environments/environment';
import { course } from '../../_models/course';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  col : course[] = [];
  beginnerCourses: course[] = [];
  advancedCourses: course[] = [];

  beginnerCourses$: Observable<course[]>;
  advancedCourses$: Observable<course[]>;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getCourses()
    this.getCourses_Reactive()
  }

  getCourses(){  
    
    const httpHandle$ = this.http.get( environment.baseUrl + "courses").pipe(
        map(r=>{
                  return r["payload"];
                  //return Object.values(r["payload"]);
               })
    );
    httpHandle$.subscribe({
        next:courses=>{
            for(let i=0;i<courses.length;i++){                
              this.col.push(courses[i]);
            }
            this.beginnerCourses = this.col.filter(c=>c.category=='BEGINNER')
            this.advancedCourses = this.col.filter(c=>c.category=='ADVANCED') 
            //console.log(this.beginnerCourses.length)
        },
        error:e=>console.log(e),
        complete:()=>{console.log("completed")}
    });
    //console.log("hello" + this.beginnerCourses.length)
    //for(let i=0;i<this.beginnerCourses.length;i++){
    //  console.log(this.beginnerCourses[i].description);
    //}
    
  }

  getCourses_Reactive(){
    const httpHandle$ = this.http.get( environment.baseUrl + "courses").pipe(
      tap(t=>console.log("HTTP Executed")),
      map(r=>{
                return r["payload"];
             }),
      shareReplay()
      );
      this.beginnerCourses$ = httpHandle$.pipe(
        map(c=>c.filter(c=>c.category=="BEGINNER"))
      );
      this.advancedCourses$ = httpHandle$.pipe(
        map(c=>c.filter(c=>c.category=="ADVANCED"))
      );
  }

}
