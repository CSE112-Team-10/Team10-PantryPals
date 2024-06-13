import './Recipe.css';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
  OrderedList,
  ListItem,
  Box,
  HStack,
  VStack,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DalleE } from '../api/DalleE';
import { RecipeManager } from '../api/RecipeManager';

function Recipe(props) {
  const { onNavigate, isOpen, onClose, recipe, number_of_servin, difficulty, cook_time, username, is_new_recipe } = props;
  const initial_ingredient = Array.isArray(recipe['recipeIngredients']) ? recipe['recipeIngredients'].join('\n') : recipe['recipeIngredients']
  const initial_instruction = Array.isArray(recipe['recipeSteps']) ? recipe['recipeSteps'].join('\n') : recipe['recipeSteps']
  const [recipe_title, set_recipe_title] = useState(recipe['recipeTitle']);
  const [recipe_ingredient, set_recipe_ingredient ] = useState(initial_ingredient);
  const [recipe_instruction, set_recipe_instruction] = useState(initial_instruction);
  const [image, set_image] = useState(null);

  const handleRecipeIngredientChange = (event) => {
    set_recipe_ingredient(event.target.value);
  };

  const handleRecipeInstructionChange = (event) => {
    set_recipe_instruction(event.target.value);
  };

  /**
     * This functions calls our api to generate a recipe image.
     * @param recipe_titel The recipe title.
     * @returns The base 64 encoding string to generate the image.
     */
  async function handleRecipeImageGenreation() {
     const result = await DalleE({
         title: recipe_title
     });
     
    return result;
  }

  async function handleSaveRecipe() {
    try {
      await RecipeManager({method:'addRecipe', userId:username, recipeTitle:recipe_title, recipeIngredients:recipe_ingredient, recipeSteps:recipe_instruction, mealType: recipe['mealType'], imageURL:image})
    } catch (error) {
      console.error(error);
    }
  }


  /**
     * Thus function is a side effect executed when the page 'Recipe' is
     * mounted. And inside the function, it generates the recipe image.
     */
  useEffect(() => {
    if(is_new_recipe) {
      async function fetchRecipeImage() {
        try {
            const result = await handleRecipeImageGenreation();
            set_image(result);
        } catch (error) {
            console.error('Failed to fetch recipe image: ', error);
        }
      }
      fetchRecipeImage();
    } else {
      set_image(recipe['imageURL'])
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay/>
      <ModalContent
        overflowY='scroll'
        margin='20px'
        maxWidth='95%'
        maxHeight='95%'
        borderRadius='2%'
        backgroundColor='#F2E8DE'
        className='scrollbar'
      >
        <ModalCloseButton onClick={() => onNavigate('home')} />
        <ModalBody>
          <HStack align='center'>
            <VStack align='start' spacing={2} flex='1'>
              <Text
                align='left'
                fontSize='60px'
                fontWeight={1000}
                color={'#A58375'}
                className='title'>
                {recipe_title}
              </Text>
              <Text
                fontSize='28px'
                fontWeight={500}
                color={'#A58375'}
                className='title'>
                Ingredients:
              </Text>
              <VStack align='start' color={'#A58375'}>
                <Textarea 
                  size='lg'
                  minWidth={'500px'}
                  maxWidth={'900px'}
                  minHeight={'300px'}
                  value={recipe_ingredient}
                  onChange={handleRecipeIngredientChange} 
                  resize={'none'} 
                  border={'transparent'}
                  className='scrollbar'
                />
              </VStack>
              <Text 
                fontSize='28px'
                fontWeight={500}
                mt='1rem'
                color={'#A58375'}
                className='title'>
                Instructions:
              </Text>
              <Textarea 
                size='lg' 
                minWidth={'500px'} 
                maxWidth={'900px'} 
                minHeight={'300px'} 
                value={recipe_instruction} 
                onChange={handleRecipeInstructionChange} 
                resize={'none'} 
                textColor={'#A58375'} 
                border={'transparent'}
                className='scrollbar'
              />
            </VStack>
            <VStack>
              <Box
                maxW='sm'
                borderWidth='15px'
                borderRadius='lg'
                overflow='hidden'
                margin='59px'
                borderColor='#A58375'>
                <Image
                  src={image ? image : "/loading.gif"}
                  alt={'recipe image'}
                  objectFit={image ? 'cover' : 'fit'}
                  boxSize={'400px'}
                />
              </Box>
              <HStack marginTop='-50'>
                <Button
                  colorScheme='green'
                  onClick={async () => {
                    await handleSaveRecipe();
                  }}
                  width={'200px'}
                  margin={'5px'}>
                  Save
                </Button>
                <Button 
                  colorScheme='red' 
                  width={'200px'} 
                  margin={'5px'} 
                  onClick={() => {
                    onNavigate('Load')
                  }}
                >
                  Regenerate
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Recipe;
