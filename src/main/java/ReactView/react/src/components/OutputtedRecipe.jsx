import { Text, Flex, Container, Stack, Button, List, OrderedList, ListItem } from '@chakra-ui/react';

function OutputtedRecipe(props) {
  const { onNavigate } = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
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
          <Text fontSize='18px' fontWeight={500}>
            Instructions:
          </Text>

          <OrderedList>
                    <ListItem>Crack an egg into a small bowl and heat a small skillet over medium-high heat.</ListItem>
                    <ListItem>When the skillet is hot enough that a drop of water sizzles rapidly on contact, reduce the heat to medium and add the oil to the pan.</ListItem>
                    <ListItem>Carefully pour the egg into the skillet.</ListItem>
                    <ListItem>Let the egg cook until the edges are crisp and golden and the yolk is cooked to your liking.</ListItem>
                    <ListItem>Transfer the cooked egg to a plate</ListItem>
                </OrderedList>
        </Stack>
      </Container>
    </Flex>
  );
}

export default OutputtedRecipe