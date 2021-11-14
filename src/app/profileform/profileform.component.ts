import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.scss']
})
export class ProfileformComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(128)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(128)]),
    dob: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
    hobbies: new FormControl(["Soccer", "Basketball"])
  });

  hobbyField: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  get firstName(): AbstractControl | null {
    return this.profileForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.profileForm.get('lastName');
  }

  get dob(): AbstractControl | null {
    return this.profileForm.get('dob');
  }

  get country(): AbstractControl | null {
    return this.profileForm.get('country');
  }

  get hobbies(): AbstractControl | null {
    return this.profileForm.get('hobbies');
  }

  addHobby(event: KeyboardEvent): void {
    let hobby = this.hobbyField.split(",")[0];

    if (hobby.trim() != "" && (event.key == "," || event.key == "Enter")) {
      let currentHobbies: string[] = this.hobbies?.value;

      if (!currentHobbies.includes(hobby)) {
        currentHobbies.push(hobby);
        this.hobbies?.patchValue(currentHobbies);
      }
      this.hobbyField = "";
    }
  }

  removeHobby(index: number): void {
    const currentHobbies: string[] = this.hobbies?.value;
    const filteredHobbies = currentHobbies.filter((hobby, hobbyIndex) => hobbyIndex != index);

    this.hobbies?.patchValue(filteredHobbies);
  }

  getFormData(): string {
    return JSON.stringify(this.profileForm.value, null, 2);
  }

  submitForm(): void {
    console.log(this.profileForm);
  }

  resetForm(): void {
    this.profileForm.reset();
  }

}
