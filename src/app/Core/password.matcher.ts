import { AbstractControl } from "@angular/forms";

export function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let passwordControl = c.get('password');
    let confirmControl = c.get('confirmPassword');
    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }
    if (passwordControl.value === confirmControl.value) {
        return null;
    }
    return { 'passwordMatch': true };
 }