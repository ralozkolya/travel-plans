import { Component, Input } from '@angular/core';
import { IPaginatedResponse } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input()
  public response: IPaginatedResponse<unknown>;

  @Input()
  public padding = 2;

  @Input()
  public showFirstLast = true;

  @Input()
  public additionalQuery;

  public get paginationNeeded(): boolean {
    return this.response?.total > this.response?.per_page;
  }

  public get first(): boolean {
    return this.showFirstLast && this.response?.current_page - 1 > this.padding;
  }

  public get last(): boolean {
    return this.showFirstLast &&  this.response?.last_page - this.response?.current_page > this.padding;
  }

  public get prev(): boolean {
    return this.response?.current_page !== 1;
  }

  public get next(): boolean {
    return this.response?.last_page !== this.response?.current_page;
  }

  public get pages(): number[] {

    const page = this.response?.current_page;
    const pages = [ page ];

    for (let i = 1; i <= this.padding; i++) {
      if (page - i > 0)  {
        pages.unshift(page - i);
      }

      if (page + i <= this.response?.last_page) {
        pages.push(page + i);
      }
    }

    return pages;
  }

  public get path(): string {
    return location.pathname;
  }

  public query(page = 1): { [ key: string ]: string; } {
    return { ...this.additionalQuery, page };
  }

}
