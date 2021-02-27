import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { DataStorage } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(
    private dataStorage: DataStorage,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  saveData() {
    this.dataStorage.storeData();
  }

  fetchData() {
    this.dataStorage.fetchData().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
