import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-participate',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './participate.html',
  styleUrl: './participate.scss',
})
export class Participate implements OnInit{
    participantForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.participantFormMethod();
  }
participantFormMethod(){
   this.participantForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required, this.ageValidator]],
      gender: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  ageValidator(control: AbstractControl) {

    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? null : { ageInvalid: true };

  }

  onFileSelect(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.participantForm.patchValue({
        photo: file
      });

      this.participantForm.get('photo')?.updateValueAndValidity();

    }

  }

 submitForm(){

  const formData = new FormData();

  formData.append("name", this.participantForm.value.name);
  formData.append("dob", this.participantForm.value.dob);
  formData.append("gender", this.participantForm.value.gender);
  formData.append("photo", this.participantForm.value.photo);

  this.http.post("http://localhost:3000/participants", formData)
  .subscribe(res=>{
      console.log(res);
      alert("Participant saved");
  });

}

}
