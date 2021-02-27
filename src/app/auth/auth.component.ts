import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { AuthResponseData } from "../auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  islogin = false;
  errorMessage: String = null;
  isLoading = false;
  authObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitch() {
    this.islogin = !this.islogin;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.islogin) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }
    this.authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.errorMessage = errorMessage;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
