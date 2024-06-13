import { useState, useEffect } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import ingredientsData from '../ingredients.json';

function RecipeList() {
  const [ingredients, setIngredients] = useState([]);

  // useEffect with an empty dependency array runs only once when the component mounts
  useEffect(() => {
    // Simulate loading ingredients from the file
    setIngredients(ingredientsData);
  }, []);

  return (
    <List spacing={2}>
      {ingredients.map((ingredient, index) => (
        <ListItem key={index} bg={index % 2 === 1 ? 'white' : 'gray.300'} p={1}>
          {ingredient}
        </ListItem>
      ))}
    </List>
  );
}

export default RecipeList;
