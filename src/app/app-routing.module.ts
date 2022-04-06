import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full'},
  {path:'recipes', loadChildren: ()=>import('./modules/recipes.module').then(m=>m.RecipesModule)},
  {path:'shopping-list', loadChildren: ()=>import('./modules/shopping-list.module').then(m=>m.ShoppingListModule)},
  {path:'auth', loadChildren: ()=>import('./modules/auth.module').then(m=>m.AuthModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
