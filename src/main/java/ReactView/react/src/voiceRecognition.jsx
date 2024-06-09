import 'regenerator-runtime';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Box,
  VStack,
  HStack,
  List,
  ListItem,
  Flex,
  Select,
  Container,
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react';

/**
 * VoiceRecognition component handles speech recognition and provides 
 * a user interface to start and stop listening to the user's voice.
 * It also includes an input field for users to type their requests.
 */
const VoiceRecognition = ({ onNavigate }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [userInput, setUserInput] = useState('');

  // Navigate function from react-router-dom
  const navigate = useNavigate();

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
            className='title'
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
              onClick={() => onNavigate('OutputtedRecipe')}>
              Generate
            </Button>
          </Stack>
          <Text align='center' fontSize='14px' fontWeight={600}>
            Microphone: {listening ? 'on' : 'off'}
          </Text>
          <Text align='center' fontSize='14px' fontWeight={600}>
            {transcript}
          </Text>
          <Input
            placeholder='Type your request here'
            value={userInput}
            onChange={handleInputChange}
            marginTop='1em'
          />
        </Stack>
      </Container>
    </Flex>
  );
};

/**
 * Welcome component provides a welcome screen with a button 
 * to navigate to the MealTypeSelect screen.
 */
function Welcome({ onNavigate }) {
  return (
    <Flex align='center' justify='center' width='full' height='full'>
      <Container maxWidth='300px'>
        <Stack spacing={2}>
          <Button
            colorScheme='blue'
            size='sm'
            onClick={() => onNavigate('MealTypeSelect')}>
            Generate New Recipe
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}

export default VoiceRecognition;
