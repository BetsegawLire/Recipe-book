import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) {}

    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 'This is simply a test','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=600,545',
    //      [
    //          new Ingredient('Meat', 1),
    //          new Ingredient('French Fries', 20)
    //      ]),
    //     new Recipe('Another Test Recipe', 'This is simply a test','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cold-spiced-chicken-recipe-1557951578.jpg?crop=1xw:1xh;center,top&resize=480:*',
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20)
    //     ]),
    //     new Recipe('A Third  Recipe', 'This is simple','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU8RAPWwtLmwXHT92R_fZ-WcRFD-0OaeGEKg&usqp=CAU',
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20)
    //     ])
    // ];
    private recipes: Recipe[] = [];

    getRecipe() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getSingleRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe:Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}