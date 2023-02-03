import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageServiceService } from "../shared/data-storage.service.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageServiceService,
    private authService: AuthService) {}
    collapsed = true;
    @Output ()featureSelected = new EventEmitter<string>();

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(
          user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
          }
        );

    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSelect(feature: string) {
      this.featureSelected.emit(feature);
    }

    onSaveData() {
      this.dataStorageService.storeRecipes();
    }

    onFetchData() {
      this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
      this.authService.logout();
    }
}


