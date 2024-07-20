import {
  Box,
  Text,
  Flex,
  Container,
  Stack,
  HStack,
} from '@chakra-ui/react';
import '../pages/styles.css';

function MealTypeSelectScreen(props) {
  const { onNavigate, set_recipe } = props;

  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container minWidth='600px' maxWidth='1000px'>
        <Stack spacing={2}>
          <Text
            color='#856454'
            className='title4'
            align='center'
            marginTop='-0.5em'
            marginBottom='0.5em'
            fontSize='40px'>
            Select Meal Type
          </Text>
          <HStack align='center' justifyContent='center'>
            <Container
              _hover={{ cursor: 'pointer' }}
              style={{
                backgroundColor: '#A58475',
                height: '350px',
                width: '250px',
                minWidth: '250px',
                borderRadius: '32px',
              }}
              onClick={() => {
                set_recipe(recipe => ({
                  ...recipe,
                  ["mealType"]:"breakfast"
                }))
                onNavigate('VoiceRecognition');
              }}>
              <Stack spacing={2} marginTop='-12'>
                <Box display='flex' justifyContent='center' marginBottom='-12'>
                  <img
                    src='/breakfast.png'
                    alt='Logo'
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '100px',
                      marginBottom: '70px',
                    }}
                  />
                </Box>
                <Text
                  color='#F2F2F2'
                  className='title4'
                  align='center'
                  fontSize='35px'
                  marginBottom='8px'>
                  Breakfast
                </Text>
              </Stack>
            </Container>
            <Container
              _hover={{ cursor: 'pointer' }}
              style={{
                backgroundColor: '#A58475',
                height: '350px',
                width: '250px',
                minWidth: '250px',
                borderRadius: '32px',
              }}
              onClick={() => {
                set_recipe(recipe => ({
                  ...recipe,
                  ["mealType"]:"lunch"
                }))
                onNavigate('VoiceRecognition');
              }}>
              <Stack spacing={2} marginTop='-12'>
                <Box display='flex' justifyContent='center' marginBottom='-12'>
                  <img
                    src='/lunch.png'
                    alt='Logo'
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '100px',
                      marginBottom: '70px',
                    }}
                  />
                </Box>
                <Text
                  color='#F2F2F2'
                  className='title4'
                  align='center'
                  fontSize='35px'
                  marginBottom='8px'>
                  Lunch
                </Text>
              </Stack>
            </Container>
            <Container
              _hover={{ cursor: 'pointer' }}
              style={{
                backgroundColor: '#A58475',
                height: '350px',
                width: '250px',
                minWidth: '250px',
                borderRadius: '32px',
              }}
              onClick={() => {
                set_recipe(recipe => ({
                  ...recipe,
                  ["mealType"]:"dinner"
                }))
                onNavigate('VoiceRecognition');
              }}>
              <Stack spacing={2} marginTop='-12'>
                <Box display='flex' justifyContent='center' marginBottom='-12'>
                  <img
                    src='/dinner.png'
                    alt='Logo'
                    style={{
                      width: '200px',
                      height: '200px',
                      marginTop: '100px',
                      marginBottom: '70px',
                    }}
                  />
                </Box>
                <Text
                  color='#F2F2F2'
                  className='title4'
                  align='center'
                  fontSize='35px'
                  marginBottom='8px'>
                  Dinner
                </Text>
              </Stack>
            </Container>
          </HStack>
        </Stack>
      </Container>
    </Flex>
  );
}

export default MealTypeSelectScreen;
