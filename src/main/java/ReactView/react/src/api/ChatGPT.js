export async function ChatGPT({meal_type='', ingredients='', number_of_serving='', difficulty='', cook_time='', cuisine=''}={}) {
    const url = `https://kdtphck5le.execute-api.us-east-1.amazonaws.com/dev?meal_type=${meal_type}&ingredients=${ingredients}&number_of_serving=${number_of_serving}&difficulty=${difficulty}&cook_time=${cook_time}&cuisine=${cuisine}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(meal_type)
      console.log(ingredients)
      const body = data['body'].replace(/^"|"$/g, '');
      const parts = body.split('\\n\\n');
      const title = parts[0];
      const ingredient = parts[1].split('\\n');
      const instruction = parts[2].split('\\n');
      const recipe = {
          title: title,
          ingredient: ingredient,
          instruction: instruction
      };
      console.log(recipe)
      return recipe;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  