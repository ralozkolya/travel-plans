import { FormGroup } from '@angular/forms';

export function DateRangeValidator(controlName: string, matchingControlName: string): (formGroup: FormGroup) => void {

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.dateRangeValidator) {
            return;
        }

        if (control.value >= matchingControl.value) {
            matchingControl.setErrors({ dateRangeValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
