import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output()
  public page = new EventEmitter<number>();

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

  public onClick(page: number): void {
    this.response.current_page = page;
    this.page.emit(page);
  }

}
