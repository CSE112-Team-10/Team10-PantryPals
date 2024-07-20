import 'regenerator-runtime';
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Flex,
  Container,
  Stack,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';

/**
 * VoiceRecognition component handles speech recognition and provides 
 * a user interface to start and stop listening to the user's voice.
 * It also includes an input field for users to type their requests.
 */
const VoiceRecognition = (props) => {
  const { onNavigate, set_recipe} = props;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [userInput, setUserInput] = useState('');

  // Start listening to the user's voice
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  // Stop listening to the user's voice
  const stopListening = () => SpeechRecognition.stopListening();

  // Handle the microphone click event to toggle listening state
  const handleClick = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Render the component UI
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='750px'>
        <Stack spacing={2}>
          <Text
            color='#856454'
            className='title4'
            align='center'
            marginTop='-0.5em'
            marginBottom='0.5em'
            fontSize='40px'>
            State Recipe Ingredients
          </Text>
          <Flex justify='center'> {/* Centering the image */}
            <img
              src={listening ? '/mic.png' : '/micmuted.png'}
              alt='Microphone Icon'
              style={{
                width: '200px',
                height: '200px',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          </Flex>
          <Stack direction='row' justify='center'>
            <Button colorScheme='red' size='sm' onClick={resetTranscript}>
              Reset
            </Button>
            <Button
              colorScheme='green'
              size='sm'
              onClick={() => {
                set_recipe(recipe => ({
                  ...recipe,
                  ["recipeIngredients"]:(userInput.length > 0 ? userInput : transcript)
                }))
                onNavigate('Load');
              }}>
              Generate
            </Button>
          </Stack>
          <Text align='center' fontSize='14px' fontWeight={600}>
            Microphone: {listening ? 'on' : 'off'}
          </Text>
          <Text align='center' fontSize='14px' fontWeight={600}>
            {userInput.length > 0 ? userInput : transcript}
          </Text>
          <Input
            placeholder='Type your ingredients here'
            value={userInput}
            onChange={handleInputChange}
            marginTop='1em'
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default VoiceRecognition;
