import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Container,
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();

  const usernameEmpty = isSubmitted && username === '';
  const passwordEmpty = isSubmitted && password === '';

  function handleLoginClick(e) {
    /*Additional Login logic here*/
    e.preventDefault();
    setIsSubmitted(true);
    if (username && password) {
      navigate('/home');
    }
  }

  function handleCreateAccountClick(e) {
    /*Additional Create Account logic here*/
    e.preventDefault();
    setIsSubmitted(true);
    if (username && password) {
      navigate('/home');
    }
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    setIsSubmitted(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setIsSubmitted(false);
  }

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <Container
        style={{
          backgroundColor: '#F2E3D2',
          maxWidth: '400px',
          borderRadius: '16px',
          padding: '48px',
        }}>
        <Stack spacing={2} marginTop='-12'>
          <Box display='flex' justifyContent='center' marginBottom='-12'>
            <img
              src='/peachandgomacook.png'
              alt='Logo'
              style={{ width: '200px', height: '200px' }}
            />
          </Box>
          <Text
            color='#856454'
            className='title'
            align='center'
            fontSize='40px'
            marginBottom='8px'>
            PantryPal
          </Text>
          <FormLabel color='#856454' marginBottom='-1'>
            Username
          </FormLabel>
          <FormControl isInvalid={usernameEmpty}>
            <Input
              backgroundColor='#BCA490'
              variant='outline'
              size='md'
              value={username}
              onChange={handleUsernameChange}
            />
            <FormErrorMessage fontSize='12px' marginTop='1'>
              Username is required
            </FormErrorMessage>
          </FormControl>
          <FormLabel color='#856454' marginBottom='-1'>
            Password
          </FormLabel>
          <FormControl isInvalid={passwordEmpty}>
            <Input
              backgroundColor='#BCA490'
              variant='outline'
              size='md'
              value={password}
              onChange={handlePasswordChange}
            />
            <FormErrorMessage fontSize='12px' marginTop='1'>
              Password is required
            </FormErrorMessage>
          </FormControl>
          <Stack
            direction='row'
            justify='center'
            marginTop='8'
            marginBottom='0'
            spacing='8'>
            <Button
              flex='1'
              size='md'
              color='white'
              backgroundColor='#856454'
              onClick={handleLoginClick}>
              Sign In
            </Button>
            <Button
              flex='1'
              size='md'
              color='white'
              backgroundColor='#856454'
              onClick={handleCreateAccountClick}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}

export default LoginPage;
