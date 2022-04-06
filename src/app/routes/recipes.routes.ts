import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesDetailComponent } from '../components/recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from '../components/recipes/recipes-edit/recipes-edit.component';
import { RecipesStartComponent } from '../components/recipes/recipes-start/recipes-start.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { AuthGuard } from '../guards/auth.guard';
import { RecipeResolverService } from '../resolvers/recipe-resolver.service';


const routes: Routes = [
  {path:'',canActivate:[AuthGuard],component:RecipesComponent,children:[
    {path:'',component:RecipesStartComponent},
    {path:'new',component:RecipesEditComponent},
    {path:':id',component:RecipesDetailComponent,resolve:[RecipeResolverService]},
    {path:':id/edit',component:RecipesEditComponent,resolve:[RecipeResolverService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoute{

}