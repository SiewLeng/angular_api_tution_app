import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { Class } from '../class';
import { ClassService } from '../class.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  class = new Class();
  teachers: Teacher[];

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (teachers) => {
        this.teachers=teachers;
      }
    );
  }

  onSubmit(form) {
    //console.log("this.class", this.class);
    this.classService.addClass(this.class).subscribe();
    form.reset();
    location.reload();
  }

}
