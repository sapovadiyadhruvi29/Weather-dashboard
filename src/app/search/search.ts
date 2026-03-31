import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html'
})
export class SearchComponent {

  city = '';

  @Output() searchCity = new EventEmitter<string>();

search() {
  if (this.city.trim()) {
    this.searchCity.emit(this.city); // 🔥 dynamic city send
  }
}
}