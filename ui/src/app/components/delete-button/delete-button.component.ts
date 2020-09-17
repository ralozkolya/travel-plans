import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  @Output()
  public action = new EventEmitter<void>();

  public confirmed = false;

  public async onClick(confirmed = false): Promise<void> {

    if (this.confirmed) {
      this.confirmed = false;
    } else {
      this.confirmed = true;
    }

    if (confirmed) {
      this.action.emit();
    }

  }

}
