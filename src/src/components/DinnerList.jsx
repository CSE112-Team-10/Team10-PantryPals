import { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Text,
  Flex,
  Container,
  Stack,
  HStack,
  VStack,
  Button,
  GridItem,
} from '@chakra-ui/react';
import '../pages/styles.css';
import RecipeItem from './RecipeItem';

function DinnerList(props) {
  
  const {onNavigate, dinner_list, set_recipe} = props

  return (
    <Flex className = 'all' width='full' height='full' backgroundColor='#F2D9BB' >
      <VStack className = 'mainstack' width='full' spacing='0px'>
        <Text
          color='#856454'
          className='title'
          marginTop='20px'
          fontSize='50px'>
          Dinner Recipes
        </Text>

      {/* will hold all the recipes in this Box */}
        <Grid className = 'BreakfastBox' width='80%' height = '100%' marginTop='20px' marginBottom='10px' templateColumns='repeat(3, 1fr)' gap={3} overflow='auto' overflow-y= 'hidden'>
          {/* recipe object */}
          {dinner_list.length > 0 ?
              dinner_list.map((recipe, index) => {
                return(
                  <GridItem 
                    key={index}
                    className = 'Recipe1' 
                    bg = '#F2E4D3'
                    _hover={{ cursor: 'pointer' }}
                    style={{
                      marginTop: '30px',
                      height: '200px',
                      width: '350px',
                      minWidth: '250px',
                      borderRadius: '32px',
                    }}
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

export default DinnerList;
