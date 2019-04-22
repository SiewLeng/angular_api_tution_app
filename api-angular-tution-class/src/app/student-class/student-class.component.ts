import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit {

  class: any;
  headElementClass: string[] = [
    "Name of Class",
    "Name of tutor",
    "Subject of tutor"
  ];
  headElementStudent: string[] = [
    "#",
    "Name",
    "Age",
    "Delete From This Class"
  ];
  obj = {
    attr0: false,
  };

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClass();
  }

  getClass(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.classService.showStudentInClass(id).subscribe(
      (group) => {
        this.class = group;
        for (let i =0; i < this.class.classWithStudentInfo.length; i++) {
          this.obj[this.class.classWithStudentInfo[i].listOfStudentId] = false;
        }
      }
    );
  }

  onSubmit(): void {
    let class_id = this.route.snapshot.paramMap.get('id');
    this.classService.deleteStudentInClass(class_id, this.obj).subscribe(
      (result) => {
        this.location.back();
      }
    );
  }

}
