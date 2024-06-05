import { Flex, Container, Stack, Button } from '@chakra-ui/react';
import '../pages/styles.css';

function WelcomeScreen(props) {
  const { onNavigate } = props;
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container
        maxHeight='1000px'
        maxWidth='500px'
        display='flex'
        justifyContent='center'>
        <Stack spacing={2}>
          <Button
            className='title3'
            height='50px'
            width='350px'
            borderRadius='16px'
            backgroundColor='#8F6152'
            textColor='#F2F2F2'
            fontSize='2em'
            onClick={() => onNavigate('MealTypeSelect')}>
            Generate Recipe
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}

export default WelcomeScreen;
