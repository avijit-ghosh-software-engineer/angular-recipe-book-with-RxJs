import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit,OnDestroy {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  subscription:Subscription;
  constructor(private route:ActivatedRoute,private recipeService:RecipesService,private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id']!=null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName ='';
    let imagePath ='';
    let desc ='';
    let recipeIngradents = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipesById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.desc;
      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          recipeIngradents.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'desc': new FormControl(desc,Validators.required),
      'ingredients': recipeIngradents
    });
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.recipeForm.reset();
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
} 
