import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import {UpdateStudentComponent } from './update-student/update-student.component';
import { AppRoutingModule } from './app-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ClassHomeComponent } from './class-home/class-home.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { Globals } from './globals/globals';
import { UpdateClassComponent } from './update-class/update-class.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { AddStudentClassComponent } from './add-student-class/add-student-class.component';

//import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StudentHomeComponent,
    StudentListComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    TeacherHomeComponent,
    TeacherListComponent,
    AddTeacherComponent,
    UpdateTeacherComponent,
    ClassHomeComponent,
    AddClassComponent,
    ClassListComponent,
    UpdateClassComponent,
    StudentClassComponent,
    AddStudentClassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
