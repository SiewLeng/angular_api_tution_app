import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../student.service';

//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';
import { Globals } from '../globals/globals';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {

  student = new Student();

  constructor(
    //private route: ActivatedRoute,
    private studentService: StudentService,
    //private location: Location,
    private globals: Globals
  ) { }


  ngOnInit() {
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.globals.students = students;
      }
    );
  }

  onSubmit(form) {
  // TODO: Use EventEmitter with form value
  //console.log(this.profileForm.value);
  this.student.age = Number(this.student.age);
  this.student.name = this.student.name.trim();
  this.studentService.addStudent(this.student).subscribe(
    ()=>{
      this.getStudents();
      form.reset();
    }
  );
  //location.reload();
  }

}
