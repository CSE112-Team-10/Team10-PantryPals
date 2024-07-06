import './styles.css';
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
import Recipe from '../components/Recipe';
import { RecipeManager } from '../api/RecipeManager';

const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [display, setDisplay] = useState('none');
  const [bookDisplay, setBookDisplay] = useState(false); 
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
  }

  const handleRecipePreview = () => {
    setBookDisplay(!bookDisplay)
    if(display == "none") {
      setDisplay("flex")
    }
    else {
      setDisplay("none")
    }
  }

  const handleRecipeBookClick = async(meal) => {
    setBookDisplay(!bookDisplay)
    setCurrentPage(`${meal}list`)
    set_is_new_recipe(false);

    const list = await fetchRecipe(meal);
    switch (meal) {
      case "breakfast":
        set_breakfast_list(list);
        break;
      case "lunch":
        set_lunch_list(list)
        break
      default:
        set_dinner_list(list)
        break
    }
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
      case 'breakfastlist':
        return <BreakfastList onNavigate={navigateTo} breakfast_list={breakfast_list} set_recipe={set_recipe}/>;
      case 'lunchlist':
        return <LunchList onNavigate={navigateTo} lunch_list={lunch_list} set_recipe={set_recipe}/>;
      case 'dinnerlist':
        return <DinnerList onNavigate={navigateTo} dinner_list={dinner_list} set_recipe={set_recipe}/>;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  function handleLogoutClick() {
    navigate(basepath);
  }

  function handleBackClick() {
    setDisplay('none');
    if (currentPage == 'MealTypeSelect') setCurrentPage('home');
    else if (currentPage == 'VoiceRecognition')
      setCurrentPage('MealTypeSelect');
    else if (currentPage == 'NewRecipe') setCurrentPage('VoiceRecognition');
    else if (currentPage == 'Load') setCurrentPage('VoiceRecognition');
    else if (currentPage == 'OutputtedRecipe')
      setCurrentPage('VoiceRecognition');
    else if (currentPage == 'breakfastlist' || currentPage == 'lunchlist' || currentPage == 'dinnerlist') {
      setCurrentPage('home');
      setDisplay('flex');
    }
  }

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <div
        className={`title4 dropdown-menu`}
        onClick={handleRecipePreview}
      >
        Recipe Book
        <div style={{display: "flex", gap: "10px"}}>
          <div className={`rectangle`}/>
          <div>
            <div
              className={`dropdown-menu-breakfast`}
              onClick={async() => {handleRecipeBookClick("breakfast")}}
            >
              BREAKFAST
            </div>
            <div
              className={`dropdown-menu-lunch`}
              onClick={async() => {handleRecipeBookClick("lunch")}}
            >
              LUNCH
            </div>
            <div
              className={`dropdown-menu-dinner`}
              onClick={async() => {handleRecipeBookClick("dinner")}}
            >
              DINNER
            </div>
          </div>
        </div>
      </div>
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
