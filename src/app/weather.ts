import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getWeatherByCity(cityName: string): Observable<any> {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;

    return this.http.get<any>(geoUrl).pipe(
      switchMap((geoData) => {
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
          `&hourly=temperature_2m,weather_code` +
          `&daily=sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min` +
          `&timezone=auto`;

        return this.http.get<any>(weatherUrl).pipe(
          map((weatherData) => ({
            location: { name, country },

            current: {
              temp: Math.round(weatherData.current.temperature_2m),
              feels_like: Math.round(
                weatherData.current.apparent_temperature
              ),
              humidity: weatherData.current.relative_humidity_2m,
              wind: weatherData.current.wind_speed_10m,
              high: Math.round(weatherData.daily.temperature_2m_max[0]),
              low: Math.round(weatherData.daily.temperature_2m_min[0]),
              code: weatherData.current.weather_code,
            },

            sun: {
              sunrise: weatherData.daily.sunrise[0].split('T')[1],
              sunset: weatherData.daily.sunset[0].split('T')[1],
              uv: weatherData.daily.uv_index_max[0],
            },

            hourly: weatherData.hourly.time
              .slice(0, 7)
              .map((t: string, i: number) => ({
                time: new Date(t).getHours() + ':00',
                temp: Math.round(weatherData.hourly.temperature_2m[i]),
              })),
          }))
        );
      })
    );
  }
}