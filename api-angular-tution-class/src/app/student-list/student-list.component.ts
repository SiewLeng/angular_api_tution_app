import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { StudentService } from '../student.service';
import { ClassService } from '../class.service';
import { Globals } from '../globals/globals';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})

export class StudentListComponent implements OnInit {

  headElement: String[] = [
    "#",
    "Name",
    "Age",
    "Edit Student",
    "Delete Student"
  ];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private classService: ClassService,
    private location: Location,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getStudents();

  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.globals.students = students;
      }
    );
  }

  deleteStudent(student: Student): void {
    this.classService.deleteStudentFromClasses(student.id).subscribe(
      (result) => {
        this.studentService.deleteStudent(student).subscribe(
          (something)=>{
            this.getStudents();
          }
        );
      }
    );
    // location.reload();
  }

}
