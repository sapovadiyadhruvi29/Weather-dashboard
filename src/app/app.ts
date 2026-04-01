import { Component, OnInit } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Searchbar } from './searchbar/searchbar';
import { WeatherCard } from './weather-card/weather-card';
import { Highlights } from './highlights/highlights';
import { HourlyForecast } from './hourly-forecast/hourly-forecast';
import { WeatherService } from './weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Sidebar,
    Searchbar,
    WeatherCard,
    Highlights,
    HourlyForecast,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  WeatherData: any = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadDefaultCity();
  }

  loadDefaultCity() {
    this.weatherService.getWeatherByCity('Rajkot').subscribe({
      next: (data) => {
        this.WeatherData = data;
      },
      error: (err) => {
        console.error('Default city weather failed:', err);
      },
    });
  }

  getData(data: any) {
    this.WeatherData = data;
  }
}