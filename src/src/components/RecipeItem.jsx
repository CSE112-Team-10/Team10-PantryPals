import '../pages/styles.css';

import { useState } from 'react';

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

function RecipeItem(props) {
    const {recipe} = props;
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseEnter() {
        setIsHovered(true);
    }

    function handleMouseLeave() {
        setIsHovered(false);
    }   

    return (
        <VStack spacing={2}>
            <Box 
                className='recipeImage'
                justifyContent='center'
                marginTop='4'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                cursor='pointer'
                position='relative'
                width='320px'
                height='170px'
            >
                    <img
                        src= {recipe['imageURL']}
                        alt= {recipe['recipeTitle']}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '32px',
                            display: isHovered ? 'none' : 'block',
                        }}
                    />
                    <Text
                        color='#856454'
                        className='scrollbar title4'
                        align='center'
                        fontSize='30px'
                        font='canva sans'
                        position='absolute'
                        top='50%'
                        left='50%'
                        transform='translate(-50%, -50%)'
                        height='100%'
                        paddingLeft='15%'
                        display={isHovered ? 'block' : 'none'}
                    >
                        {recipe['recipeTitle']}
                    </Text>
            </Box>
        </VStack>
    )
}
export default RecipeItem;