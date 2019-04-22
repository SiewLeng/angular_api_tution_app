import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../student.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
    .subscribe(
      (student) => {
        this.student = student;
      }
    );
  }

  onSubmit(form) {
    this.student.name = this.student.name.trim();
    this.student.age = Number(this.student.age);
    this.studentService.updateStudent(this.student).subscribe(
      (result) =>{
        form.reset();
        this.location.back();
      }
    );
  }

}
