import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { AuthService } from './auth.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
    constructor(private http:HttpClient,private recipesService:RecipesService,private authService:AuthService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://recipebook-e10a4-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            
        });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipebook-e10a4-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipes=>{
                return {
                    ...recipes,
                    ingredient:recipes.ingredient?recipes.ingredient:[]
                };
            })
        }),
        tap(recipes=>{
            this.recipesService.setRecipes(recipes);
        })); 
    }
}