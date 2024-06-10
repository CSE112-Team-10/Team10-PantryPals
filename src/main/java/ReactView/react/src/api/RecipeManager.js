export async function RecipeManager({ method, userId, recipeId, recipeTitle, recipeText, mealType, base64Image }) {
    const url = `https://gmz0b5uwv0.execute-api.us-east-2.amazonaws.com/${method}`;

    let content;
    if(method == 'deleteRecipe'){
        content = JSON.stringify({recipeId:recipeId});
    }
    else if(method == 'addRecipe'){
        content = JSON.stringify({userId:userId, recipeTitle:recipeTitle, recipeText:recipeText, mealType:mealType, base64Image:base64Image});
    }
    else if(method == 'getRecipeList'){
        content = JSON.stringify({userId:userId});
    }
    else if(method == 'getRecipe'){
        content = JSON.stringify({recipeId:recipeId});
    }
    else if(method == 'updateRecipe'){
        content = JSON.stringify({recipeId:recipeId, recipeText:recipeText})
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
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  