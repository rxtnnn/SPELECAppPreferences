import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  preferences = {
    option1: false,
    option2: false,
    option3: false,
    rangeValue: 50,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    radio1: false,
    radio2: false
  };

  constructor() {}

  ngOnInit() {
    this.loadPreferences();
  }

  async loadPreferences() {
    const { value } = await Preferences.get({ key: 'appSettings' });
    if (value) {
      this.preferences = JSON.parse(value);
    }
  }

  async savePreferences() {
    await Preferences.set({
      key: 'appSettings',
      value: JSON.stringify(this.preferences),
    });
    alert('Settings saved!');
  }

  async resetPreferences() {
    this.preferences = {
      option1: false,
      option2: false,
      option3: false,
      rangeValue: 50,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      radio1: false,
      radio2: false

    };
    await Preferences.remove({ key: 'appSettings' });
    alert('Settings reset to default!');
  }

  onPreferenceChange() {
    this.savePreferences();
  }
}
