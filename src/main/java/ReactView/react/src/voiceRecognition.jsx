import 'regenerator-runtime';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { useState, useEffect } from 'react';
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

const VoiceRecognition = (props) => {
  const { onNavigate } = props;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const handleClick = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const navigate = useNavigate();

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
        </Stack>
      </Container>
    </Flex>
  );
};

function Welcome(props) {
  const { onNavigate } = props;
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
