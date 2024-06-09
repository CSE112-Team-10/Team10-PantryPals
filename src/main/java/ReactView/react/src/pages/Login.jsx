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
  useToast,
} from '@chakra-ui/react';
import './styles.css';
import { AccountManager } from '../../../../../../api/AccountManager';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();
  const toast = useToast();

  const usernameEmpty = isSubmitted && username === '';
  const passwordEmpty = isSubmitted && password === '';

  async function handleLoginClick(e, toast) {
    e.preventDefault();
    
    if(username === '' || password === '') {
      return;
    }

    const toast_id = toast({
      title: 'Loading',
      status: 'loading',
      duration: null,
      isClosable: false,
    });

    try {
      const result = await AccountManager({ method: 'verify', username:username, password:password});      

      if (result == '1' && username && password) {
        toast.update(toast_id, {
          title: 'Login Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/home');
      } else {
        toast.update(toast_id,{
          title: 'Username or Password incorrect',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast.update(toast_id,{
        title: 'Login failed',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  async function handleCreateAccountClick(e) {
    e.preventDefault();
    setIsSubmitted(true);

    if(username === '' || password === '') {
      console.log('test');
      return;
    }

    const toast_id = toast({
      title: 'Loading',
      status: 'loading',
      duration: null,
      isClosable: false,
    });

    try {
      const result = await AccountManager({ method: 'addUser', username:username, password:password});

      if (result != '-1' && username && password) {
        toast.update(toast_id, {
          title: 'Account created',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/home');
      } else {
        toast.update(toast_id, {
          title: 'Username already exists',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(result);
      }
    } catch (error) {
      toast.update(toast_id, {
        title: 'Login failed',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
              onClick={(e) => handleLoginClick(e, toast)}
            >
              Sign In
            </Button>
            <Button
              flex='1'
              size='md'
              color='white'
              backgroundColor='#856454'
              onClick={(e) => handleCreateAccountClick(e, toast)}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}

export default LoginPage;
