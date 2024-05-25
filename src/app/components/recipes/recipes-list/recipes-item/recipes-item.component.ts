import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input('repItem') recipeItem : Recipe;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }


}
