import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerObject } from 'src/app/shared/data-grid/data-grid.type';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  constructor(private router:Router, private api: ApiService) {}

  dummyData = [
    {name: 'vishal', age: 20, },
    {name: 'vishal', age: 20, },
  ]

  headers: headerObject[] = [
    {
    name: 'name',
    title: 'Name',
    visible: true
  },
  {
    name: 'age',
    title: 'Age',
    visible: true
  }
]


ngOnInit(): void {
  this.getItems()
}

getItems() {
  this.api.get('/items').subscribe({
    next: (data) => {
      console.log(data, 'data');

    }
  })
}



handleAdd() {
  this.router.navigate(['/menu/add'])
}

}
