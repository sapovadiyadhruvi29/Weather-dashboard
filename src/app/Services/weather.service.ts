import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  cityName='Rajkot';
  dayName='Monday';
  dateLabel='24 Dec, 2023';
  temperature=26;
  maxTemp=27;
  minTemp=10;
  condition='Cloudy';
  sunrise='6:45 AM';
  sunset='5:30 PM';
  rainChance=20;
  uvIndex=5;
  wind=12;
  humidity=65;

  constructor(private http: HttpClient){ this.getData(); }

  getData(){
    this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${this.cityName}&count=1`)
    .subscribe({
      next: geo => {
        const p = geo.results?.[0];
        if(!p) return;
        this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`)
        .subscribe(w => {
          this.temperature = Math.round(w.current.temperature_2m);
          this.humidity = w.current.relative_humidity_2m;
          this.wind = Math.round(w.current.wind_speed_10m);
          this.maxTemp = Math.round(w.daily.temperature_2m_max[0]);
          this.minTemp = Math.round(w.daily.temperature_2m_min[0]);
          this.sunrise = new Date(w.daily.sunrise[0]).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
          this.sunset = new Date(w.daily.sunset[0]).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
          this.dayName = new Date().toLocaleDateString('en-US',{weekday:'long'});
          this.dateLabel = new Date().toLocaleDateString('en-US',{day:'2-digit', month:'short', year:'numeric'});
        });
      }
    })
  }
}
