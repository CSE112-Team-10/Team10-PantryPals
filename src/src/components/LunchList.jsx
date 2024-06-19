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

function LunchList(props) {
  const {onNavigate, lunch_list, set_recipe, handleModal} = props

  return (
    <Flex className = 'all' width='full' height='full' backgroundColor='#F2D9BB' >
      <VStack className = 'mainstack' width='full' spacing='0px'>
        <Text
          color='#856454'
          className='title'
          marginTop='20px'
          fontSize='50px'>
          Lunch recipes
        </Text>
      {/* will hold all the recipes in this Box */}
        <Grid className = 'BreakfastBox' width='80%' height = '100%' marginTop='20px' marginBottom='10px' templateColumns='repeat(3, 1fr)' gap={3} overflow='auto' overflow-y= 'hidden'>
          {/* recipe object */}
          {lunch_list.length > 0 ?
            lunch_list.map((recipe, index) => {
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

export default LunchList;
