import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
   recipeChanged = new Subject<Recipe[]>();
  //  private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Name 1',
  //     'Test Description 1',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
  //     [
  //       new Ingredient('Egg',12),
  //       new Ingredient('Meat',1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Test Name 2',
  //     'Test Description 2',
  //     'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
  //     [
  //       new Ingredient('Meat',12),
  //       new Ingredient('Tomato',6)
  //     ]
  //   ),
  //   new Recipe(
  //     'Test Name 3',
  //     'Test Description 3',
  //     'https://www.familyfoodonthetable.com/wp-content/uploads/2016/09/15-minute-honey-garlic-chicken-square-480x480.png',
  //     [
  //       new Ingredient('Paneer',3),
  //       new Ingredient('Red Chille',4)
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  
  constructor(private slService:ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  
  
  getRecipesById(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  
}