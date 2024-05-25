import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from './../../../services/recipes.service';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit,OnDestroy {
  recipeDetails:Recipe;
  id:number;
  recipeSubscription:Subscription;
  constructor(private recipeService:RecipesService,private route:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.recipeSubscription = this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipeDetails = this.recipeService.getRecipesById(this.id);
    });
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredient);
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
