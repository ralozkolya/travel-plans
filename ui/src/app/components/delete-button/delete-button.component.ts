import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  @Output()
  public action = new EventEmitter<void>();

  public asked = false;

  public async onClick(confirmed = false): Promise<void> {

    if (this.asked) {
      this.asked = false;

      if (confirmed) {
        this.action.emit();
      }

    } else {
      this.asked = true;
    }

  }

}
