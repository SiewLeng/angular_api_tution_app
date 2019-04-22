import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  teacher: Teacher;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacher(id)
    .subscribe(
      (teacher) => {
        this.teacher = teacher;
      }
    );
  }

  onSubmit(form) {
    this.teacher.name = this.teacher.name.trim();
    this.teacher.subject = this.teacher.subject.trim();
    this.teacher.age = Number(this.teacher.age);
    this.teacherService.updateTeacher(this.teacher).subscribe(
      (result) =>{
        form.reset();
        this.location.back();
      }
    );
  }

}
