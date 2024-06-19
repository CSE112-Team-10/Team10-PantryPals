import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import WelcomePage from '../components/WelcomePage';
import MealTypeSelectPage from '../components/MealTypeSelectPage';
import VoiceRecognition from '../components/voiceRecognition';
import Load from '../components/Load';
import BreakfastList from '../components/BreakfastList';
import LunchList from '../components/LunchList';
import DinnerList from '../components/DinnerList';
import './styles.css';
import Recipe from '../components/Recipe';
import { RecipeManager } from '../api/RecipeManager';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [recording, setRecording] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [display, setDisplay] = useState('none');
  const [bookDisplay, setBookDisplay] = useState('flex'); 
  const [meal_type, set_meal_type] = useState('');
  const [ingredients, set_ingredients] = useState('');
  const [number_of_serving, set_number_of_servering] = useState('');
  const [difficulty, set_difficulty] = useState('');
  const [cook_time, set_cook_time] = useState('');
  const [cuisine, set_cuisine] = useState('');
  const [recipe, set_recipe] = useState(null);
  const [breakfast_list, set_breakfast_list] = useState([]);
  const [lunch_list, set_lunch_list] = useState([]);
  const [dinner_list, set_dinner_list] = useState([]);
  const [is_new_recipe, set_is_new_recipe]=  useState(false);
  const location = useLocation();
  const log_info = location.state;
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
    setCurrentPage('BreakfastList');
  }

  function handleLunchBook() {
    setDisplay('none');
    setCurrentPage('LunchList');
  }

  function handleDinnerBook() {
    setDisplay('none');
    setCurrentPage('DinnerList');
  }
  
  async function fetchRecipe(mealType) {
    try {
      const result = await RecipeManager({ method: 'getRecipeList', userId: log_info.username})
      let recipeList = [];
      for(const recipe of result) {
        let thisMealType = recipe['mealType'];
        if(mealType == thisMealType){
          recipeList.push(recipe);
        }
      }
      return recipeList;
    } catch(error) {
      console.error(error);
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WelcomePage onNavigate={navigateTo}/>;
      case 'MealTypeSelect':
        return <MealTypeSelectPage onNavigate={navigateTo} set_meal_type={set_meal_type}/>;
      case 'VoiceRecognition':
        return <VoiceRecognition onNavigate={navigateTo} set_ingredients={set_ingredients}/>;
      case 'Load':
        return <Load onNavigate={navigateTo} set_recipe={set_recipe} meal_type={meal_type} ingredients={ingredients} number_of_serving={number_of_serving} difficulty={difficulty} cook_time={cook_time} cuisine={cuisine} set_is_new_recipe={set_is_new_recipe} />;
      case 'Recipe':
        return <Recipe onNavigate={navigateTo} recipe={recipe} number_of_serving={number_of_serving} difficulty={difficulty} cook_time={cook_time} username={log_info.username} is_new_recipe={is_new_recipe}/>;
      case 'BreakfastList':
        return <BreakfastList onNavigate={navigateTo} breakfast_list={breakfast_list} set_recipe={set_recipe}/>;
      case 'LunchList':
        return <LunchList onNavigate={navigateTo} lunch_list={lunch_list} set_recipe={set_recipe}/>;
      case 'DinnerList':
        return <DinnerList onNavigate={navigateTo} dinner_list={dinner_list} set_recipe={set_recipe}/>;
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
    else if (currentPage == 'BreakfastList' || currentPage == 'LunchList' || currentPage == 'DinnerList') {
      setCurrentPage('home');
      setDisplay('flex');
    }
  }

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
        onClick={async () => {
          const list = await fetchRecipe('breakfast');
          set_breakfast_list(list);
          set_is_new_recipe(false);
          handleBreakfastBook();
        }}
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
        onClick={async () => {
          const list = await fetchRecipe('lunch');
          set_lunch_list(list);
          set_is_new_recipe(false);
          handleLunchBook();
        }}
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
        onClick={async () => {
          const list = await fetchRecipe('dinner');
          set_dinner_list(list);
          set_is_new_recipe(false);
          handleDinnerBook();
        }}
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
        {'hello'}
        <Box width='100%' height='full'>
          {renderPage()}
        </Box>
      </HStack>
    </Flex>
  );
}

export default HomePage;
