import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  teacher = new Teacher();

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    //console.log("this.teacher", this.teacher);
    this.teacher.name =this.teacher.name.trim();
    this.teacher.subject =this.teacher.subject.trim();
    this.teacher.age = Number(this.teacher.age);
    this.teacherService.addTeacher(this.teacher).subscribe(
      (result)=> {
        form.reset();
        location.reload();
      }
    );
  }

}
