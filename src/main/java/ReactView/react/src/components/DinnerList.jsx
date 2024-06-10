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
  Image
} from '@chakra-ui/react';
import '../pages/styles.css';
import RecipeItem from './RecipeItem';
import Recipe from './Recipe';
import recipesData from '../recipes.json'; 


function DinnerList(props) {

  const [imageState, newImageState] = useState('block');
  const [textState, newTextState] = useState('none');
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  const { onNavigate } = props;
  return (
    <Flex className = 'all' width='full' height='full' backgroundColor='#F2D9BB' >
      <VStack className = 'mainstack' width='full' spacing='0px'>
        <Text
          color='#856454'
          className='title'
          marginTop='20px'
          marginRight='50px'
          fontSize='50px'>
          Dinner Recipes
        </Text>

      {/* will hold all the recipes in this Box */}
      <Grid
          width='80%'
          marginTop='20px'
          marginBottom='10px'
          templateColumns='repeat(3, 1fr)'
          gap={3}
          overflow='auto'>
          {recipesData.recipes.map((recipe, index) => (
            <GridItem
              key={index}
              bg='#F2E4D3'
              _hover={{ cursor: 'pointer' }}
              style={{
                marginTop: '30px',
                height: '200px',
                width: '350px',
                minWidth: '250px',
                borderRadius: '32px',
              }}
              onClick={() => handleOpen(recipe)}>
              <RecipeItem recipe={recipe} />
            </GridItem>
          ))}
        </Grid>
      </VStack>
      {selectedRecipe && (
        <Recipe isOpen={isModalOpen} onClose={handleClose} recipe={selectedRecipe} />
      )}
    </Flex>
  );
}

export default DinnerList;
