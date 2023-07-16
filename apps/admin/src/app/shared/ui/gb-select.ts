import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'gb-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgSelectModule],
  template: ` <ng-select [items]="items"></ng-select> `,
})
export class GbSelectComponent implements OnInit {
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  @Input() apiURL = '';
  @Input() loadOnMount = true;

  items: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.getItems();
  }

  private setItems(items: any[]) {
    this.items = items;
  }

  private _detectChanges() {
    this.cdr.detectChanges();
  }

  private updateLoader(value: boolean) {
    this.loading = value;
    this._detectChanges();
  }

  private getItems() {
    if (!this.apiURL) {
      return;
    }
    this.updateLoader(true);
    this.api.get<any[]>(this.apiURL).subscribe({
      next: (data) => {
        this.setItems(data);
        this.updateLoader(false);
      },
      error: () => {
        this.updateLoader(false);
        // handle error
      },
    });
  }
}
