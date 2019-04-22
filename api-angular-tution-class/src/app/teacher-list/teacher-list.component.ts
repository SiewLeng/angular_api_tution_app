import { Component, OnInit } from '@angular/core';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { ClassService } from '../class.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: Teacher[];
  headElement: String[] = [
    "#",
    "Name",
    "Age",
    "Subject",
    "Edit Teacher",
    "Delete Teacher"
  ];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private classService: ClassService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (teachers) => {
        this.teachers = teachers;
      }
    );
  }

  deleteTeacher(teacher: Teacher): void {
    this.classService.deleteTeacherFromClasses(teacher.id).subscribe(
      (result) => {
        this.teacherService.deleteTeacher(teacher).subscribe(
          (result) => {
            location.reload();
          }
        );
      }
    );
  }

}
