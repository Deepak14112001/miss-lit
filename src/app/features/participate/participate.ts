import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participate',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './participate.html',
  styleUrl: './participate.scss',
})
export class Participate implements OnInit{
    participantForm!: FormGroup;
    loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route:Router) {}

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

  this.loading = true;

  const formData = new FormData();

  formData.append("name", this.participantForm.value.name);
  formData.append("dob", this.participantForm.value.dob);
  formData.append("gender", this.participantForm.value.gender);
  formData.append("photo", this.participantForm.value.photo);

  this.http.post("https://gluier-toilfully-tuan.ngrok-free.dev/participants", formData)
  .subscribe({
    next: (res)=>{
      alert("Participant saved");
      this.loading = false;
      this.route.navigateByUrl("previous")
    },
    error: (err)=>{
      alert("Error saving participant");
      this.loading = false;
    }
  });

}

}
