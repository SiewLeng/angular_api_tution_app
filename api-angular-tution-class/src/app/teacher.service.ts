import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Teacher} from './teacher';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    const url = `http://localhost:3000/teachers`;
    return this.http.get<Teacher[]>(url)
      .pipe(
        catchError(this.handleError),
      )
  }

  getTeacher(id: string): Observable<Teacher> {
    const url = `http://localhost:3000/teachers/find/${id}`;
    return this.http.get<Teacher>(url)
      .pipe(
        catchError(this.handleError),
      )
  }

  addTeacher(teacher: Teacher): Observable<any> {
    const url = `http://localhost:3000/teachers/create`;
    return this.http.post<Teacher>(url, teacher, httpOptions).pipe(
      catchError(this.handleError),
    )
  }

  deleteTeacher(teacher: Teacher): Observable<any> {
    const url = `http://localhost:3000/teachers/delete/${teacher.id}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError),
    )
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const url = `http://localhost:3000/teachers/update`;
    return this.http.put<Teacher>(url, teacher, httpOptions)
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
