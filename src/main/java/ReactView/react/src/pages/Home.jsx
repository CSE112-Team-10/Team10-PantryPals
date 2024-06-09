import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import WelcomePage from '../components/WelcomePage';
import MealTypeSelectPage from '../components/MealTypeSelectPage';
import VoiceRecognition from '../voiceRecognition';
import Sidebar from '../components/Sidebar';
import NewRecipe from '../components/NewRecipe';
import OutputtedRecipe from '../components/OutputtedRecipe';
import Load from '../components/Load';
import BreakfastList from '../components/BreakfastList';
import LunchList from '../components/LunchList';
import DinnerList from '../components/DinnerList';
import './styles.css';
import Recipe from '../components/Recipe';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [recording, setRecording] = useState(false);

  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(['', '']);
  const [display, setDisplay] = useState('none');
  const [bookDisplay, setBookDisplay] = useState('flex'); 
  const [modal, set_modal] = useState(false);

  {
    /* for images and texts in recipes to hide*/
  }

  const navigate = useNavigate();

  const navigateTo = (page) => {
    setDisplay('none');
    setCurrentPage(page);
  };

  function handleRecipePreview() {
    if (display == 'none') setDisplay('flex');
    else setDisplay('none');
  }

  function handleBreakfastBook() {
    setDisplay('none');
    setBookDisplay('none');
    setCurrentPage('BreakfastList');
  }

  function handleLunchBook() {
    setDisplay('none');
    setBookDisplay('none');
    setCurrentPage('LunchList');
  }

  function handleDinnerBook() {
    setDisplay('none');
    setBookDisplay('none');
    setCurrentPage('DinnerList');
  }
  
  const handleModal = () => {
    set_modal(!modal)
  }
  

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WelcomePage onNavigate={navigateTo} />;
      case 'MealTypeSelect':
        return <MealTypeSelectPage onNavigate={navigateTo} />;
      case 'VoiceRecognition':
        return <VoiceRecognition onNavigate={navigateTo} />;
      case 'NewRecipe':
        return <NewRecipe onNavigate={navigateTo} />;
      case 'Load':
        return <Load onNavigate={navigateTo} />;
      case 'OutputtedRecipe':
        return <OutputtedRecipe onNavigate={navigateTo} />;
      case 'Recipe':
        return <Recipe onNavigate={navigateTo} isOpen={modal} onClose={handleModal} />;
      case 'BreakfastList':
        return <BreakfastList onNavigate={navigateTo} />;
      case 'LunchList':
        return <LunchList onNavigate={navigateTo} />;
      case 'DinnerList':
        return <DinnerList onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  function handleLogoutClick() {
    navigate(basepath);
  }

  function handleBackClick() {
    setBookDisplay('flex');
    setDisplay('none');
    if (currentPage == 'MealTypeSelect') setCurrentPage('home');
    else if (currentPage == 'VoiceRecognition')
      setCurrentPage('MealTypeSelect');
    else if (currentPage == 'NewRecipe') setCurrentPage('VoiceRecognition');
    else if (currentPage == 'Load') setCurrentPage('VoiceRecognition');
    else if (currentPage == 'OutputtedRecipe')
      setCurrentPage('VoiceRecognition');
    else if (
      currentPage == 'BreakfastList' ||
      currentPage == 'LunchList' ||
      currentPage == 'DinnerList'
    ) {
      setCurrentPage('MealTypeSelect');
      setDisplay('flex');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <Box
        className='title4'
        position='absolute'
        top='50px'
        left='50px'
        backgroundColor='#F2D9BB'
        color='#8F6152'
        display={bookDisplay}
        justifyContent='left'
        _hover={{ cursor: 'pointer' }}
        onClick={handleRecipePreview}
        fontWeight='600'>
        Recipe Book
      </Box>
      <Box
        className='breakfast'
        position='absolute'
        top='100px'
        left='90px'
        backgroundColor='#F2D9BB'
        color='#A58375'
        display={display}
        justifyContent='left'
        _hover={{ cursor: 'pointer' }}
        onClick={handleBreakfastBook}
        fontWeight='600'
        fontSize='25'>
        BREAKFAST
      </Box>
      <Box
        className='lunch'
        position='absolute'
        top='140px'
        left='90px'
        backgroundColor='#F2D9BB'
        color='#A58375'
        display={display}
        justifyContent='left'
        _hover={{ cursor: 'pointer' }}
        onClick={handleLunchBook}
        fontWeight='600'
        fontSize='25'>
        LUNCH
      </Box>
      <Box
        className='dinner'
        position='absolute'
        top='180px'
        left='90px'
        // backgroundColor='#F2D9BB'
        color='#A58375'
        display={display}
        justifyContent='left'
        _hover={{ cursor: 'pointer' }}
        onClick={handleDinnerBook}
        fontWeight='600'
        fontSize='25'>
        DINNER
      </Box>
      <Box
        className='rectangle'
        position='absolute'
        display={display}
        top='100px'
        left='70px'
        width='4px'
        backgroundColor='#8F6152'
        height='120px'></Box>
      <Box
        className='title4'
        position='absolute'
        top='50px'
        right='50px'
        backgroundColor='#F2D9BB'
        color='#8F6152'
        display='flex'
        justifyContent='right'
        _hover={{ cursor: 'pointer' }}
        fontWeight='600'
        onClick={handleLogoutClick}>
        Log Out
      </Box>
      {currentPage !== 'home' && (
        <Box
          className='title4'
          position='absolute'
          bottom='50px'
          right='50px'
          backgroundColor='#F2D9BB'
          color='#8F6152'
          display='flex'
          justifyContent='right'
          _hover={{ cursor: 'pointer' }}
          fontWeight='600'
          onClick={handleBackClick}>
          Back
        </Box>
      )}
      <HStack width='full' height='full' spacing={0}>
        {/* <Flex minWidth='300px' height='full' p={4} padding='16px 0px 16px 16px'>
          <Sidebar />
        </Flex> */}
        <Box width='100%' height='full'>
          {renderPage()}
          {/* <WelcomePage /> */}
          {/* <VoiceRecognition></VoiceRecognition>  */}
        </Box>
      </HStack>
    </Flex>
  );
}

export default HomePage;
