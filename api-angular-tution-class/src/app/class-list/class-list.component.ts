import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})

export class ClassListComponent implements OnInit {

  classes: any[];
  headElement: String[] = [
    "#",
    "Name of Class",
    "Name of Tutor",
    "Subject of Tutor",
    "Edit the Class",
    "Delete the Class",
    "Show Student in Class",
    "Add Student from Class",
  ];

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses(): void {
    this.classService.getClasses().subscribe(
      (classes) => {
        this.classes = classes;
      }
    );
  }

  deleteClass(group: any): void {
    this.classService.deleteClass(group.id).subscribe(
      (result) => {
        location.reload();
      }
    );
  }

}
