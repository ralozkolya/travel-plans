import { Component, Output, EventEmitter } from '@angular/core';
import { expandXAnimation, showHideAnimation } from 'src/app/animations/expand.animation';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  animations: [ expandXAnimation, showHideAnimation ]
})
export class DeleteButtonComponent {

  @Output()
  public delete = new EventEmitter<void>();

  @Output()
  public edit = new EventEmitter<void>();

  public asked = false;

  public onDelete(confirmed = false): void {

    if (this.asked) {
      this.asked = false;

      if (confirmed) {
        this.delete.emit();
      }

    } else {
      this.asked = true;
    }

  }

  public onEdit(): void {
    this.edit.emit();
  }

}
