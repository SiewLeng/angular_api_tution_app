import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Student } from './student';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const url = 'http://localhost:3000/students';
    return this.http.get<Student[]>(url)
      .pipe(
        catchError(this.handleError),
      )
  }

  getStudent(id: string): Observable<Student> {
    const url = `http://localhost:3000/students/find/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        catchError(this.handleError),
      )
  }

  addStudent(student: Student): Observable<any> {
    const url = 'http://localhost:3000/students/create';
    return this.http.post<Student>(url, student, httpOptions).pipe(
      catchError(this.handleError),
    )
  }

  deleteStudent(student: Student): Observable<any> {
    const url = `http://localhost:3000/students/delete/${student.id}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError),
    )
  }

  updateStudent(student: Student): Observable<any> {
    const url = `http://localhost:3000/students/update`;
    return this.http.put<Student>(url, student, httpOptions)
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
