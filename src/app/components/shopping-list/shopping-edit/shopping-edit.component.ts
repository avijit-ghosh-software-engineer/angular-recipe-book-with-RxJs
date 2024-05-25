import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription : Subscription;
  @ViewChild('frm') frm : NgForm;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private slService:ShoppingListService) { }


  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index:number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.frm.setValue({
        name: this.editedItem.name,
        amount:  this.editedItem.amount
      });
    });
  }

  onSubmitItem(formData:NgForm){
    const data = formData.value;
    const ingredient = new Ingredient(data.name,data.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,ingredient);
    }
    else{
      this.slService.addIngredient(ingredient);
    }
    this.ngOnClear();
  }

  ngOnClear(){
    this.editMode = false;
    this.frm.reset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.ngOnClear();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
