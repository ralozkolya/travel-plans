import { FormGroup } from '@angular/forms';
import { Roles } from '../enums/roles.enum';

export function RoleValidator(controlName: string): (formGroup: FormGroup) => void {

  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];

    if (!Object.values(Roles).includes(control.value)) {
      control.setErrors({ roleValidator: true });
    } else {
      control.setErrors(null);
    }
  };
}
