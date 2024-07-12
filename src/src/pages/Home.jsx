import './styles.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Button } from '@chakra-ui/react';
import { RecipeManager } from '../api/RecipeManager';
import WelcomePage from '../components/WelcomePage';
import MealTypeSelectPage from '../components/MealTypeSelectPage';
import VoiceRecognition from '../components/voiceRecognition';
import Load from '../components/Load';
import BreakfastList from '../components/BreakfastList';
import LunchList from '../components/LunchList';
import DinnerList from '../components/DinnerList';
import Recipe from '../components/Recipe';
import BouncyButton from '../components/BouncyButton';


const basepath = import.meta.env.BASE_URL;

function HomePage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [recipe, set_recipe] = useState({});
  const [breakfast_list, set_breakfast_list] = useState([]);
  const [lunch_list, set_lunch_list] = useState([]);
  const [dinner_list, set_dinner_list] = useState([]);
  const [is_new_recipe, set_is_new_recipe]=  useState(false);
  const [breakfast_list_fetched, set_breakfast_list_fetched] = useState(false);
  const [lunch_list_fetched, set_lunch_list_fetched] = useState(false);
  const [dinner_list_fetched, set_dinner_list_fetched] = useState(false);
  const location = useLocation();
  const log_info = location.state;
  const navigate = useNavigate();

  const navigateTo = (page) => {
    setCurrentPage(page);
  }

  const handleRecipeBookClick = async(meal) => {
    setCurrentPage(`${meal}list`)
    set_is_new_recipe(false);

    switch (meal) {
      case "breakfast":
        if(!breakfast_list_fetched) {
          const list = await fetchRecipe(meal)
          set_breakfast_list(list)
          set_breakfast_list_fetched(v => (!v))
        }
        break;
      case "lunch":
        if(!lunch_list_fetched) {
          const list = await fetchRecipe(meal)
          set_lunch_list(list)
          set_lunch_list_fetched(v => (!v))
        }
        break
      default:
        if(!dinner_list_fetched) {
          const list = await fetchRecipe(meal)
          set_dinner_list(list)
          set_dinner_list_fetched(v => (!v))
        }
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
        return <MealTypeSelectPage onNavigate={navigateTo} set_recipe={set_recipe}/>;
      case 'VoiceRecognition':
        return <VoiceRecognition onNavigate={navigateTo} set_recipe={set_recipe}/>;
      case 'Load':
        return <Load onNavigate={navigateTo} recipe={recipe} set_recipe={set_recipe} set_is_new_recipe={set_is_new_recipe}/>;
      case 'Recipe':
        return <Recipe onNavigate={navigateTo} recipe={recipe} set_recipe={set_recipe} username={log_info.username} is_new_recipe={is_new_recipe}/>;
      case 'breakfastlist':
        return <BreakfastList onNavigate={navigateTo} recipe_list={breakfast_list} set_recipe={set_recipe}/>;
      case 'lunchlist':
        return <LunchList onNavigate={navigateTo} recipe_list={lunch_list} set_recipe={set_recipe}/>;
      case 'dinnerlist':
        return <DinnerList onNavigate={navigateTo} recipe_list={dinner_list} set_recipe={set_recipe}/>;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  function handleLogoutClick() {
    navigate(basepath);
  }

  function handleBackClick() {
    if (currentPage == 'MealTypeSelect') {
      setCurrentPage('home');
    }
    else if (currentPage == 'VoiceRecognition') {
      setCurrentPage('MealTypeSelect');
    }
    else if (currentPage == 'NewRecipe') {
      setCurrentPage('VoiceRecognition');
    }
    else if (currentPage == 'Load') {
      setCurrentPage('VoiceRecognition');
    }
    else if (currentPage == 'OutputtedRecipe'){
      setCurrentPage('VoiceRecognition');
    }
    else if (currentPage == 'breakfastlist' || 
             currentPage == 'lunchlist' || 
             currentPage == 'dinnerlist') {
      setCurrentPage('home');
    }
  }

  return (
    <Flex width='100vw' height='100vh' align='center' justify='center'>
      <div
        className={`title4 dropdown-menu`}
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
      <div className='logout' onClick={handleLogoutClick}>
        <BouncyButton >
          logout
        </BouncyButton>
      </div>
      {currentPage !== 'home' && (
        <div className='back-button' onClick={handleBackClick}>
          <BouncyButton>
            Back
          </BouncyButton>
        </div>
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
