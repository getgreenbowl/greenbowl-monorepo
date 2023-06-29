import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class GridHeaderService {
  private _header = new BehaviorSubject([])
}
