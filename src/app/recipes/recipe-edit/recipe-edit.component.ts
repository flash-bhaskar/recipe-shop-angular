import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  imgPath: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];

      //if url has parameter then it is editmode or else new one
      this.editMode = params["id"] != null;

      //initialising the form whenever page loads(Reactive form)
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let imagePath = "";
    let description = "";
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      //checking whether recipe has ingredients or not
      console.log("recipe['ingredients']" + recipe["ingredients"]);
      console.log("recipe.ingredients" + recipe.ingredients);

      if (recipe["ingredients"]) {
        for (let ingre of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingre.name, Validators.required),
              amount: new FormControl(ingre.amount, [
                Validators.required,
                Validators.pattern("^[1-9]+[0-9]*$"), // regular expression to allow only numbers above 1 and not negative numbers
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  get controls() {
    //returning the ingredients control array to html file
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  addIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  removeIngredient(index: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    //moving one route above
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
