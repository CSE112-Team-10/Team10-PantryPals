import '../pages/styles.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
  Box,
  HStack,
  VStack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DalleE } from '../api/DalleE';
import { RecipeManager } from '../api/RecipeManager';

function Recipe(props) {
  const { onNavigate, recipe, set_recipe, username, is_new_recipe } = props;
  const [image, set_image] = useState(null);

  const handleRecipeIngredientChange = (event) => {
    set_recipe(recipe => ({
        ...recipe,
        ["reciepIngredients"]:event.target.value
      }))
  };

  const handleRecipeInstructionChange = (event) => {
    set_recipe(recipe => ({
      ...recipe,
      ["recipeSteps"]:event.target.value
    }))
  };

  const { onClose } = useDisclosure();

  const handleClose = () => {
    if(!is_new_recipe) {
      switch(recipe['mealType']) {
        case 'breakfast':
          onNavigate('breakfastlist');
          return;
        case 'lunch':
          onNavigate('lunchlist');
          return;
        default:
          onNavigate('dinnerlist');
          return;
      }
    } else {
      onNavigate('home');
    }
  }

  /**
   * This functions calls our api to generate a recipe image.
   * @param recipe_titel The recipe title.
   * @returns The base 64 encoding string to generate the image.
   */
  async function handleRecipeImageGenreation() {
     const result = await DalleE({
         title: recipe.recipeTitle
     });
     
    return result;
  }

  async function handleSaveRecipe() {
    try {
      await RecipeManager({method:'addRecipe', userId:username, recipeTitle:recipe.recipeTitle, recipeIngredients:recipe.recipeIngredients, recipeSteps:recipe.recipeSteps, mealType:recipe.mealType, imageURL:recipe.imageURL})
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
            set_recipe(recipe => ({
              ...recipe,
              ["imageURL"]:result
            }))
            set_image(result)
        } catch (error) {
            console.error('Failed to fetch recipe image: ', error);
        }
      }
      fetchRecipeImage();
    } else {
      set_image(recipe.imageURL)
    }
  }, [])

  return (
    <Modal blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={true} onClose={onClose} closeOnEsc={false} size='xl' isCentered >
      <ModalOverlay/>
      <ModalContent
        margin='20px'
        maxWidth='95%'
        maxHeight='95%'
        borderRadius='2%'
        backgroundColor='#F2E8DE'
        className='scrollbar'
      >
        <ModalCloseButton onClick={handleClose}/>
        <ModalBody>
          <HStack align='center'>
            <VStack align='start' spacing={2} flex='1'>
              <Text
                align='left'
                fontSize='60px'
                fontWeight={1000}
                color={'#A58375'}
                className='title'>
                {recipe.recipeTitle}
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
                  minHeight={'200px'}
                  value={recipe.recipeIngredients}
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
                minHeight={'400px'} 
                value={recipe.recipeSteps} 
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
