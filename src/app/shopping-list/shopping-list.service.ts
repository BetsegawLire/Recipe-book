import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChnged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 12)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient) {
            this.ingredients.push(ingredient);
            this.ingredientsChnged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChnged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChnged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        for(let ingredient of ingredients) {
            this.addIngredient(ingredient);
        }
      }
}