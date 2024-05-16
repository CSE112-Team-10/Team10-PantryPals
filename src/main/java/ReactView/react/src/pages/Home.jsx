import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import WelcomePage from '../components/WelcomePage';
import MealTypeSelectPage from '../components/MealTypeSelectPage';
import VoiceRecognition from '../voiceRecognition';
import Sidebar from '../components/Sidebar';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [recording, setRecording] = useState(false);

  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(['', '']);
  const navigate = useNavigate();

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WelcomePage onNavigate={navigateTo} />;
      case 'MealTypeSelect':
        return <MealTypeSelectPage onNavigate={navigateTo} />;
      case 'VoiceRecognition':
        return <VoiceRecognition onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  function handleLogoutClick() {
    navigate(basepath);
  }

  function handleBackClick() {
    if (currentPage == 'MealTypeSelect') setCurrentPage('home');
    else if (currentPage == 'VoiceRecognition')
      setCurrentPage('MealTypeSelect');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <Button
        p={2}
        position='absolute'
        top='15px'
        right='15px'
        size='sm'
        colorScheme='blue'
        onClick={handleLogoutClick}>
        Logout
      </Button>
      {currentPage !== 'home' && (
        <Button
          p={2}
          position='absolute'
          bottom='15px'
          right='15px'
          size='sm'
          colorScheme='red'
          onClick={handleBackClick}>
          Back
        </Button>
      )}
      <HStack width='full' height='full' spacing={0}>
        <Flex minWidth='300px' height='full' p={4} padding='16px 0px 16px 16px'>
          <Sidebar />
        </Flex>
        <Box width='100%' height='full' padding='16px 16px 16px 0px'>
          {renderPage()}
          {/* <WelcomePage /> */}
          {/* <VoiceRecognition></VoiceRecognition> */}
        </Box>
      </HStack>
    </Flex>
  );
}

export default HomePage;
