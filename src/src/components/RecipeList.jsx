import './RecipeList.css'
import {
  Grid,
  Text,
  Flex,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import RecipeItem from './RecipeItem';

function RecipeList(props) {
  const {onNavigate, recipe_list, set_recipe} = props

  return (
    <Flex className='Flex'>
      <VStack className = 'main-stack'>
        <Text className='title'>
          Lunch Recipes
        </Text>
        <Grid className='recipe-grid'>
          {recipe_list.length > 0 ?
            recipe_list.map((recipe, index) => {
              return(
                <GridItem
                  className='recipe-grid-item'
                  key={index}
                  onClick={() => {
                    set_recipe(recipe);
                    onNavigate('Recipe');
                  }}
                >
                  <RecipeItem recipe={recipe}/>
                </GridItem>
              )
            })
            : null
          }
        </Grid> 
      </VStack>
    </Flex>
  );
}

export default RecipeList;