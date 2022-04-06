import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesDetailComponent } from '../components/recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from '../components/recipes/recipes-edit/recipes-edit.component';
import { RecipesItemComponent } from '../components/recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from '../components/recipes/recipes-list/recipes-list.component';
import { RecipesStartComponent } from '../components/recipes/recipes-start/recipes-start.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { RecipesRoute } from '../routes/recipes.routes';
import { ParentModule } from './parent.module';


@NgModule({
    declarations: [ 
        RecipesComponent, RecipesListComponent, 
        RecipesDetailComponent, RecipesItemComponent,
        RecipesStartComponent, RecipesEditComponent],
    
    // exports: [ 
    //     RecipesComponent, RecipesListComponent, 
    //     RecipesDetailComponent, RecipesItemComponent,
    //     RecipesStartComponent, RecipesEditComponent],
    imports:[ParentModule,RecipesRoute]
  
})
export class RecipesModule{}     