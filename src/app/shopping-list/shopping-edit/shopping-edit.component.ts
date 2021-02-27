import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  editMode=false;
  index:number;
  @ViewChild('f') shoppingForm:NgForm;
  editedItem:Ingredient;
  subscription:Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.selectedIngrediant.subscribe(
      (id:number)=>{
        this.editMode=true;
        this.index=id;
        this.editedItem=this.slService.getIngredient(this.index);
        this.shoppingForm.setValue({
          'name':this.editedItem.name,
          'amount':this.editedItem.amount
        });
      }
    )
  }

  onSubmit(){
    const value=this.shoppingForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
      this.slService.onUpdateIngredient(this.index,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.onClear();
}

  OnDeleteIngre(){
    this.slService.onDeleteIngredient(this.index);
    this.onClear();
  }

  onClear(){
    this.shoppingForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
