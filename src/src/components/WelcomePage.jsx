import { Flex, Container, Stack, Button } from '@chakra-ui/react';
import '../pages/styles.css';
import BouncyButton from './BouncyButton';

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
          <BouncyButton>
            <Button
              className='title2'
              height='50px'
              width='350px'
              borderRadius='16px'
              backgroundColor='#8F6152'
              textColor='#F2F2F2'
              fontSize='1.5em'
              onClick={() => {
                onNavigate('MealTypeSelect');
              }}
              >
              Generate Recipe
            </Button>
          </BouncyButton>
          
        </Stack>
      </Container>
    </Flex>
  );
}

export default WelcomeScreen;
