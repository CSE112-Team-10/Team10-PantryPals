import { Text, Flex, Container, Stack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatGPT } from '../api/ChatGPT';

function NewRecipe(props) {
  const { onNavigate, meal_type, ingredients, number_of_serving, difficulty, cook_time, cuisine } = props;
  const [recipe, setRecipe] = useState(null);

  async function handleRecipeGeneration() {
    const result = await ChatGPT({ 
      meal_type: meal_type, 
      ingredients: ingredients, 
      number_of_serving: number_of_serving,
      difficulty: difficulty,
      cook_time: cook_time,
      cuisine: cuisine 
    });
    
    return result;
  };

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const result = await handleRecipeGeneration();
        setRecipe(result);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      }
    }
    fetchRecipe()
  }, [])

  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='700px'>
        
        {recipe ? 
          <Stack spacing={2}>
            <Text align='center' fontSize='20px' fontWeight={600}>
                Title:  {recipe['title']}
            </Text>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Ingredients: {recipe['ingredient']}
            </Text>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Instruction: {recipe['instruction']}
            </Text>
          </Stack>
          : 
          <Stack spacing={2}>
            <Text align='center' fontSize='20px' fontWeight={600}>
              Generating Recipe...
            </Text>
          </Stack>
        }
      </Container>
    </Flex>
  );
}

export default NewRecipe; 