import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiceService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipe();
    this.http.put('https://recipebook-91d6a-default-rtdb.firebaseio.com/recipe.json', recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {
   
      return this.http.get<Recipe[]>('https://recipebook-91d6a-default-rtdb.firebaseio.com/recipe.json')
    .pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }))
  }
}
