export  function test() {
    const text = `Tomato and Spinach Frittata\n\n- 4 eggs\n- 2 tomatoes, diced\n- 1 cup fresh spinach, chopped\n- Salt and pepper to taste\n- 1 tablespoon olive oil\n\n1. Preheat the oven to 350\u00b0F (180\u00b0C).\n2. In a bowl, whisk the eggs and season with salt and pepper.\n3. Heat olive oil in an oven-safe skillet over medium heat.\n4. Add the diced tomatoes and cook for 2-3 minutes until slightly softened.\n5. Add the chopped spinach to the skillet and cook until wilted.\n6. Pour the whisked eggs over the tomatoes and spinach in the skillet.\n7. Cook for 3-4 minutes until the edges start to set.\n8. Transfer the skillet to the preheated oven and bake for about 10-12 minutes until the frittata is set and slightly golden on top.\n9. Remove from the oven and let it cool for a few minutes.\n10. Slice the frittata into wedges and serve hot. Enjoy your Tomato and Spinach Frittata!`;
    
    const parts = text.split('\n\n');
    const title = parts[0];
    const ingredient = parts[1].split('\n');
    const instruction = parts[2].split('\n');
    const recipe = {
        title: title,
        ingredient: ingredient,
        instruction: instruction
    };
    return recipe;
  }
  