import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-right-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.css']
})
export class RightContainerComponent {
  constructor(public weatherService: WeatherService) {}
}