import { Component } from '@angular/core';
import { ListOfEvents } from '../../../events/components/list-of-events/list-of-events';

@Component({
  selector: 'app-home',
  imports: [ListOfEvents],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
