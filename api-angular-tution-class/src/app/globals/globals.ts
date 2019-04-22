import { Injectable } from "@angular/core";
import { Student } from '../student';

@Injectable()
export class Globals{
    public students: Student[];
}
