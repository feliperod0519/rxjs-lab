import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { coursesSearch } from '../_models/coursesSearch'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { course } from '../_models/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-lab';
  col : course[] = [];

  public constructor(private http:HttpClient){

  }

  ngOnInit():void{
    const c: coursesSearch= new coursesSearch();
    c.search(["x","y","z"]).subscribe({
      next:(x)=>{console.log(x)},
      error:noop,
      complete:()=>console.log("End")
            
    });
    
    //console.log(this.coursesServices.col.length);
    //for(let i=0;i<this.courses.length;i++)
    //  console.log("hello");//this.courses[i].id + " " + this.courses[i].description);
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
        },
        error:e=>console.log(e),
        complete:noop
    });
    for(let i=0;i<this.col.length;i++){
      console.log(this.col[i].description);
    }
  }
}
