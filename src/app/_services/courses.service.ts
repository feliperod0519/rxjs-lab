import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { course } from '../../_models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  

  constructor(private http:HttpClient) { 
  }

  getCourses(){  

    const col:course[]=[];
    const httpHandle$ = this.http.get( environment.baseUrl + "courses").pipe(
        map(r=>{
                  return r["payload"];
                  //return Object.values(r["payload"]);
               })
    );
    httpHandle$.subscribe({
        next:courses=>{
            for(let i=0;i<courses.length;i++){ 
               col.push(courses[i]);
            }
            console.log("S" + col.length);   
        }
    });
    console.log("O" + col.length);
  }
}
