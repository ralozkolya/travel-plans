import { FormGroup } from '@angular/forms';

export function RoleValidator(controlName: string): (formGroup: FormGroup) => void {

  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];

    if (!([ 'user', 'manager', 'admin' ].includes(control.value))) {
      control.setErrors({ roleValidator: true });
    } else {
      control.setErrors(null);
    }
  };
}
