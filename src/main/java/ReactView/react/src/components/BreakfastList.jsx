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

let numRecipes = 1; 

function BreakfastList(props) {

  const [imageState, newImageState] = useState('block');
  const [textState, newTextState] = useState('none');

  function handleImageState() {
    if (imageState == 'block') {
      newImageState('none'); 
      newTextState('block'); 
    }
    else {
      newImageState('block'); 
      newTextState('none'); 
    }
  }
  
  const { onNavigate } = props;
  return (
    <Flex className = 'all' width='full' height='full' backgroundColor='#F2D9BB' >
      <VStack className = 'mainstack' width='full' spacing='0px'>
        <Text
          color='#856454'
          className='title'
          marginTop='20px'
          fontSize='50px'>
          Breakfast Recipes
        </Text>

      {/* will hold all the recipes in this Box */}
        <Grid className = 'BreakfastBox' width='80%' height = '100%' marginTop='20px' marginBottom='10px' templateColumns='repeat(3, 1fr)' gap={3} overflow='auto' overflow-y: hidden>
          {/* recipe object */}
            <GridItem className = 'Recipe1' bg = '#F2E4D3'
              _hover={{ cursor: 'pointer' }}
              onMouseEnter={() => handleImageState()}
              onMouseLeave={() => handleImageState()}    
              style={{
                marginTop: '30px',
                height: '200px',
                width: '350px',
                minWidth: '250px',
                borderRadius: '32px',
              }}
              onClick={() => onNavigate('VoiceRecognition')}>
              <VStack spacing={2}>
                <Box className = 'recipeImage' 
                    justifyContent='center' 
                    marginBottom='-12'>
                  <img
                    src='/chickenQueso.webp'
                    alt='Logo'
                    style={{
                      width: '320px',
                      height: '170px',
                      marginTop: '15px',
                      display: imageState,
                      borderRadius: '32px',
                    }}
                  />
                </Box>
                <Text
                  color='#856454'
                  className='title4'
                  align='center'
                  fontSize='30px'
                  font = 'canva sans'
                  marginTop= '120px'
                  display= {textState}>
                  Chicken Quesadilla
                </Text>
              </VStack>
            </GridItem>
        </Grid> 
      </VStack>
    </Flex>
  );
}

export default BreakfastList;
