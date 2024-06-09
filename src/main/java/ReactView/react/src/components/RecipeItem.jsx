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

function RecipeItem(props) {

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

    return (
        <VStack spacing={2}>
            <Box 
                className = 'recipeImage' 
                justifyContent='center' 
                marginBottom='-12'
                onMouseEnter={() => handleImageState()} 
                onMouseLeave={() => handleImageState()}
                cursor='pointer'
            >
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
    )
}
export default RecipeItem;