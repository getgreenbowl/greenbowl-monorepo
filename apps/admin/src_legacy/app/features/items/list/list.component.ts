import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
