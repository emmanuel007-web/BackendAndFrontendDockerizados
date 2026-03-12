import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  isLoggedIn = false;
  username   = '';
  logoutSuccess = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username   = localStorage.getItem('username') ?? '';
  }

  doLogout(): void {
    this.authService.logout();
    this.isLoggedIn   = false;
    this.logoutSuccess = true;
    this.username      = '';
    setTimeout(() => this.logoutSuccess = false, 3000);
  }
}