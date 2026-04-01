import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.css',
})
export class HourlyForecast {
  @Input() data: any;

  get forecastData() {
    if (!this.data?.current) return [];

    return [
      {
        label: 'Now',
        temp: this.data.current.temp,
        icon: '🌡️',
      },
      {
        label: 'Feels Like',
        temp: this.data.current.feels_like,
        icon: '☁️',
      },
      {
        label: 'Min',
        temp: this.data.current.low,
        icon: '🌙',
      },
      {
        label: 'Max',
        temp: this.data.current.high,
        icon: '☀️',
      },
    ];
  }

  trackByHour(index: number): number {
    return index;
  }
}