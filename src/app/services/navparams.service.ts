import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavparamsService {

  data: any;

  constructor() { }

  setData = (navObj) => {
    this.data = navObj;
  }

  getData = () => {
    if(this.data === null || this.data === undefined)
      return 0
    return this.data;
  }
}
