import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-student-class',
  templateUrl: './add-student-class.component.html',
  styleUrls: ['./add-student-class.component.css']
})
export class AddStudentClassComponent implements OnInit {
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
    "Add To This Class"
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
    let class_id = this.route.snapshot.paramMap.get('id');
    this.classService.showStudentNotInClass(class_id).subscribe(
      (group) => {
        this.class = group;
        for (let i =0; i < this.class.filteredStudentList.length; i++) {
          this.obj[this.class.filteredStudentList[i].id] = false;
        }
      }
    );
  }

  onSubmit(): void {
    let class_id = this.route.snapshot.paramMap.get('id');
    this.classService.addStudentInClass(class_id, this.obj).subscribe(
      (result) => {
        this.location.back();
      }
    );
  }

}
