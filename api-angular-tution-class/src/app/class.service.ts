import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Class } from './class';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  addClass(group: Class): Observable<any> {
    const url = `http://localhost:3000/classes/create`;
    return this.http.post<Class>(url, group, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }


  getClasses(): Observable<any> {
    const url = `http://localhost:3000/classes/`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError),
      );
  }

  getClass(id: string): Observable<Class> {
    const url = `http://localhost:3000/classes/find/${id}`;
    return this.http.get<Class>(url)
      .pipe(
        catchError(this.handleError),
      );
  }

  showStudentInClass(id: string): Observable<any> {
    const url = `http://localhost:3000/classes/showStudent/${id}`;
    return this.http.get<any>(url)
      .pipe(
          catchError(this.handleError),
      )
  }

  showStudentNotInClass(id: string): Observable<any> {
    const url = `http://localhost:3000/classes/addStudent/${id}`;
    return this.http.get<any>(url)
      .pipe(
          catchError(this.handleError),
      )
  }

  addStudentInClass(class_id: string, obj: object): Observable<any> {
    const url = `http://localhost:3000/classes/addStudent/${class_id}`;
    return this.http.put<any>(url, obj, httpOptions)
      .pipe(
        catchError(this.handleError),
      )
  }

  deleteStudentInClass(class_id: string, obj: object): Observable<any> {
    const url =`http://localhost:3000/classes/deleteStudent/${class_id}`;
    return this.http.put<any>(url, obj, httpOptions)
      .pipe(
        catchError(this.handleError),
      )
  }

  deleteClass(id: string): Observable<any> {
    const url = `http://localhost:3000/classes/delete/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }

  deleteStudentFromClasses(student_id: string): Observable<any> {
    const url = `http://localhost:3000/classes/deleteStudentFromClasses/${student_id}`;
   return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
 }

  deleteTeacherFromClasses(teacher_id: string): Observable<any> {
    const url = `http://localhost:3000/classes/deleteTeacherFromClasses/${teacher_id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }


  updateClass(group: Class): Observable<Class> {
    const url = `http://localhost:3000/classes/update`;
    return this.http.put<Class>(url, group, httpOptions)
      .pipe(
        catchError(this.handleError),
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }

    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
      // return an observable with a user-facing error message
    return throwError(
    'Something bad happened; please try again later.');
  };

}
