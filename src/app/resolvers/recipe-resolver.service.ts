import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../services/data-storage.service';
import { RecipesService } from '../services/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService,private recipesService:RecipesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        if(recipes.length===0){
            return this.dataStorageService.fetchRecipes();
        }
        else{
            return recipes;
        }
    }

} 