import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentHomeComponent } from './student-home/student-home.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { ClassHomeComponent } from './class-home/class-home.component';
import { UpdateClassComponent } from './update-class/update-class.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { AddStudentClassComponent } from './add-student-class/add-student-class.component';

const routes: Routes = [
  {path: 'addStudentInClass/:id', component:AddStudentClassComponent},
  {path: 'showStudentInClass/:id', component: StudentClassComponent},
  {path: 'updateStudent/:id', component: UpdateStudentComponent},
  {path: 'updateTeacher/:id', component: UpdateTeacherComponent},
  {path: 'updateClass/:id', component: UpdateClassComponent},
  {path: 'student', component: StudentHomeComponent},
  {path: 'teacher', component: TeacherHomeComponent},
  {path: 'class', component: ClassHomeComponent},
]

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})

export class AppRoutingModule { }
