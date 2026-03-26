import { Component, input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnChanges, OnDestroy {
  title = input<string>();

  constructor() {
    console.log('Navbar constructor');
  }

  ngOnChanges(): void {
    console.log('Navbar changed');
  }

  ngOnInit(): void {
    console.log('Navbar initialized');
  }

  ngOnDestroy(): void {
    console.log('Navbar destroyed');
  }
}
