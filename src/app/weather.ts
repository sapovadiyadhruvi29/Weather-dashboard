import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = 'https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=YOUR_API_KEY&units=metric'; // 🔴 add your key

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );
  }
}