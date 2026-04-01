import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  city = '';
  @Output() weatherEvent = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) { }

  search() {
    if (!this.city.trim()) return;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (res) => {
        console.log('API DATA:', res);
        this.weatherEvent.emit(res);
      },
      error: (err) => {
        console.error('Weather API Error:', err);
      },
    });
  }
}