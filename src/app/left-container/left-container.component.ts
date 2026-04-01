import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-left-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.css']
})
export class LeftContainerComponent {
  constructor(public weatherService: WeatherService) {}

  searchCity(cityInput: string) {
    if (!cityInput) return;
    this.weatherService.cityName = cityInput;
    this.weatherService.getData();
  }
}