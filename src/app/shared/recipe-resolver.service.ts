import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorage } from "./data-storage.service";

@Injectable({ providedIn: "root" })
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorage,
    private reicpeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.reicpeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchData();
    } else {
      return recipes;
    }
  }
}
