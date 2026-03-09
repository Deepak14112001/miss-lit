import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants-list',
  imports: [CommonModule],
  templateUrl: './participants-list.html',
  styleUrl: './participants-list.scss',
})
export class ParticipantsList implements OnInit{
participants:any[] = [];

  constructor(private http:HttpClient, private route:Router){}

  ngOnInit(){
    this.loadParticipants();
  }
  backButtonClick(){
    this.route.navigateByUrl('previous')
  }

  loadParticipants(){

    this.http.get<any[]>("https://gluier-toilfully-tuan.ngrok-free.dev/participants")
    .subscribe(data => {

      console.log(data);

      this.participants = data;

    });

  }
}
