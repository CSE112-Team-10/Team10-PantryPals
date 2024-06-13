/**
 * Takes in components of a recipe object and depending on the method, adds, deletes, gets, or upd
 * 
 * @param method There are five routes, deleteRecipe, addRecipe, getRecipeList, getRecipe, and updateRecipe.
 * @param userId THe usernname of the account.
 * @param recipeId The unique id associted with each recipe.
 * @param recipeTitle The title of the recipe.
 * @param recipeSteps The instructions of the recipe.
 * @param recipeIngredients The ingredients of the recipe.
 * @param mealType The type of meal (breakfast, lunch, dinner)
 * @param imageURL The URL of the recipe's image
 * @returns 
 */
export async function RecipeManager({ method, userId, recipeId, recipeTitle, recipeSteps, recipeIngredients, mealType, imageURL }) {
    const url = `https://gmz0b5uwv0.execute-api.us-east-2.amazonaws.com/${method}`;

    let content;
    if(method == 'deleteRecipe'){
        content = JSON.stringify({recipeId:recipeId});
    }
    else if(method == 'addRecipe'){
        content = JSON.stringify({userId:userId, recipeTitle:recipeTitle, recipeSteps:recipeSteps, recipeIngredients:recipeIngredients, mealType:mealType, imageURL:imageURL});
    }
    else if(method == 'getRecipeList'){
        content = JSON.stringify({userId:userId});
    }
    else if(method == 'getRecipe'){
        content = JSON.stringify({recipeId:recipeId});
    }
    else if(method == 'updateRecipe'){
        content = JSON.stringify({recipeId:recipeId, recipeSteps:recipeSteps, recipeIngredients, recipeIngredients})
    }

    const options = {
      method: method === 'deleteRecipe' ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: content
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  