import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating app';
  users: any;

  constructor (private accountService: AccountService, private presenceService: PresenceService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser(){
    const user : User = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.accountService.setCurrentUser(user)
      this.presenceService.createHubConnection(user);
    } 
    
  }
  
}
