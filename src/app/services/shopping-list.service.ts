import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Eggs', 5),
    new Ingredient('Chicken', 15),
    new Ingredient('Paneer', 3),
  ];
  
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }
  
  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    //this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice()); 
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    //this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index:number,newingredient:Ingredient){
    this.ingredients[index] = newingredient;
    this.ingredientChanged.next(this.ingredients.slice()); 
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice()); 
  }
}
