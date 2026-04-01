import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlights.html',
  styleUrl: './highlights.css',
})
export class Highlights {
  @Input() data: any;

  get humidity(): string {
    return this.data?.current?.humidity ?? '--';
  }

  get wind(): string {
    return this.data?.current?.wind ?? '--';
  }

  get feelsLike(): string {
    return this.data?.current?.feels_like ?? '--';
  }

  get pressure(): string {
    return '1012'; // static placeholder because open-meteo current request doesn't include pressure
  }
}