import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'first-project';
  // loadedFeature = 'recipe';
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
      this.auth.autoLogin();
  }
}
