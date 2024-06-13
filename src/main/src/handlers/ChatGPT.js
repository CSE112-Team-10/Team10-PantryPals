/**
 * This function invokes an aws lambda function that sends an api request to OpenAI to 
 * generate a recipe.
 * @param meal_type The meal type of the recipe.
 * @param ingredients The ingredients of the recipe.
 * @param number_of_serving The number of servings for the recipe.
 * @param difficulty The difficulty of the recipe.
 * @param cook_time The cook time for the recipe.
 * @param cuisine The cuisine type for the recipe.
 * @returns An array that contains the recipe title, recipe ingredients, and recipe instructions.
 */
export async function ChatGPT({meal_type='', ingredients='', number_of_serving='', difficulty='', cook_time='', cuisine=''}={}) {
    const url = `https://kdtphck5le.execute-api.us-east-1.amazonaws.com/dev?meal_type=${meal_type}&ingredients=${ingredients}&number_of_serving=${number_of_serving}&difficulty=${difficulty}&cook_time=${cook_time}&cuisine=${cuisine}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const body = data['body'].replace(/^"|"$/g, '');
      const parts = body.split('\\n\\n');
      const title = parts[0];
      const ingredient = parts[1].split('\\n');
      const instruction = parts[2].split('\\n');
      const recipe = {
          recipeTitle: title,
          recipeIngredients: ingredient,
          recipeSteps: instruction,
          mealType: meal_type,
      };
      return recipe;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  