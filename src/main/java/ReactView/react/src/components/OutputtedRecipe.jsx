import { Text, Flex, Container, Stack, Button, List, OrderedList, ListItem, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

function OutputtedRecipe(props) {
  const { onNavigate } = props;
  const [content, setContent] = useState(
    `1. Crack an egg into a small bowl and heat a small skillet over medium-high heat.\n` +
    `2. When the skillet is hot enough that a drop of water sizzles rapidly on contact, reduce the heat to medium and add the oil to the pan.\n` +
    `3. Carefully pour the egg into the skillet.\n` +
    `4. Let the egg cook until the edges are crisp and golden and the yolk is cooked to your liking.\n` +
    `5. Transfer the cooked egg to a plate`
  );

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Flex align='center' justify='center' width='full' height='full' flexDirection='column' overflowY={true}>
      <Container maxWidth='300px'>
        <Stack spacing={4}>
          <Text align='center' fontSize='24px' fontWeight={700}>
            Fried Eggs
          </Text>
          <img src='https://upload.wikimedia.org/wikipedia/commons/f/f0/Fried_Egg_2.jpg'/>
          <Text fontSize='18px' fontWeight={500}>
            Ingredients:
          </Text>
          <Text fontSize='16px'>
            - 2 Eggs
          </Text>
          <Text fontSize='16px'>
            - 1 Tablespoon Oil
          </Text>
        </Stack>
      </Container>
      
      <Container maxWidth='50%' maxHeight='300px'>
        <Text fontSize='18px' fontWeight={500}>
          Instructions:
        </Text>
        <Textarea size='lg' height='300px' value={content} onChange={handleInputChange} />
      </Container>
    </Flex>
  );
}

export default OutputtedRecipe