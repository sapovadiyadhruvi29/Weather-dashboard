import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from './weather';

import { WeatherCardComponent } from './weather-card/weather-card';
import { SearchComponent } from './search/search';
import { LoaderComponent } from './loader/loader';
import { ErrorComponent } from './error/error';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WeatherCardComponent,
    SearchComponent,
    LoaderComponent,
    ErrorComponent
  ],
  providers: [WeatherService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  weatherData: any;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchWeather('Ahmedabad');
  }

  fetchWeather(city: string) {
    this.loading = true;
    this.error = '';

    this.weatherService.getWeather(city).subscribe({
      next: (res: any) => {
        this.weatherData = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'City not found!';
        this.loading = false;
      }
    });
  }
}