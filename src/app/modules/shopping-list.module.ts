import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from '../components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { ShoppingListRoute } from '../routes/shopping-list.routes';
import { ParentModule } from './parent.module';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent], 
    imports:[ParentModule,ShoppingListRoute]
  
}) 
export class ShoppingListModule{}     