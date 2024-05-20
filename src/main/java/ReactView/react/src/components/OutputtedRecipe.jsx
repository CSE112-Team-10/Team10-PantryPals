import { Text, Flex, Container, Stack, Button } from '@chakra-ui/react';


function OutputtedRecipe(props) {
  const { onNavigate } = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='300px'>
        <Stack spacing={4}>
          <Text align='center' fontSize='24px' fontWeight={700}>
            Eggs
          </Text>
          <img src='https://upload.wikimedia.org/wikipedia/commons/f/f0/Fried_Egg_2.jpg'/>
          <Text fontSize='18px' fontWeight={500}>
            Ingredients:
          </Text>
          <Text fontSize='16px'>
            - Egg
          </Text>
          <Text fontSize='16px'>
            - Oil
          </Text>
          <Text fontSize='18px' fontWeight={500}>
            Instructions:
          </Text>
          <Text fontSize='16px'>
            Crack egg. oil pan. turn on fire to high. put egg in pan. enjoy
          </Text>
        </Stack>
      </Container>
    </Flex>
  );
}

export default OutputtedRecipe