import './RecipeItem.css'
import {
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';

function RecipeItem(props) {
    const {recipe} = props;

    return (
        <VStack spacing={2}>
            <Box 
                className='recipeItem'
            >
                    <img
                        className='recipeImage'
                        src= {recipe['imageURL']}
                        alt= {recipe['recipeTitle']}
                    />
                    <Text className='recipeText scrollbar'>
                        {recipe['recipeTitle']}
                    </Text>
            </Box>
        </VStack>
    )
}
export default RecipeItem;