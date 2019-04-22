import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Class } from '../class';
import { ClassService } from '../class.service';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit {

  class: Class;
  teachers: Teacher[];

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClass();
  }

  getClass(): void {
    let teacherService = this.teacherService;
    let id = this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).subscribe(
      (group) => {
        this.class = group;
        teacherService.getTeachers().subscribe(
          (teachers) => {
            this.teachers = teachers;
          }
        );
      }
    );
  }

  onSubmit(form) {
    //console.log("this.class", this.class);
    this.classService.updateClass(this.class).subscribe(
      (result) => {
        form.reset();
        this.location.back();
      }
    );
  }

}
