import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  recipes: Recipe[];

  constructor(private recipeService:RecipesService) {}


  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
