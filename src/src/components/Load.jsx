import {
    Text,
    Flex,
    Container,
    Stack,
} 
from '@chakra-ui/react';
import '../pages/styles.css';
import { ChatGPT } from '../api/ChatGPT';
import { useEffect } from 'react';


function Load(props) {
    const { onNavigate, recipe, set_recipe, set_is_new_recipe } = props;

    /**
     * This function calls our api to generate a recipe.
     * @returns An array that has the recipe title, recipe ingredients,
     *          and recipe instructions.
     */
    async function handleRecipeGeneration() {
        const result = await ChatGPT({ 
          meal_type: recipe.mealType, 
          ingredients: recipe.recipeIngredients, 
        });
        
        return result;
    };
    
    /**
     * Thus function is a side effect executed when the page 'Load' is
     * mounted. And inside the function, it generates the recipe and recipe image.
     */
    useEffect(() => {
        async function fetchRecipe() {
            try {
                const result = await handleRecipeGeneration();
                set_is_new_recipe(true);
                set_recipe(result);
                onNavigate('Recipe');
            } catch (error) {
                console.error('Failed to fetch recipe: ', error);
            }
        }
        fetchRecipe();
    }, [])

    return (
        <Flex align='center' justify='center' width='full' height='full'>
            <Container centerContent>
                <Stack>
                    <img src="/loading.gif" width="300"/>
                    <Text 
                    color='#856454' 
                    className='title'
                    align='center'
                    marginTop='20px'
                    fontSize='30px'
                    fontWeight={750}>
                        Generating...
                    </Text>
                </Stack>
            </Container>
        </Flex>
    )
}

export default Load;