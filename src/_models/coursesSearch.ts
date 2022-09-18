import { observable, Observable, Observer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { course } from '../_models/course';

export class coursesSearch{

    constructor(){
    }

    search(terms:string[]):Observable<any>{
        const rxjs = new Observable(observer=>{
                for(let i=0;i<=terms.length-1;i++){
                    observer.next(terms[i]);
                }
                observer.complete();
            });
        return rxjs;
    }

    getCourses(http: HttpClient,url:string):course[]{
        const col:course[]=[];
        const httpHandle$ = http.get("http://localhost:9000/api/courses").pipe(
            map(r=>Object.values(r))
        );
        httpHandle$.subscribe({
            next:courses=>{
                for(let i=0;i<courses.length;i++)
                    col.push(course[i]);   
            }
        });
        return col;

    }
}