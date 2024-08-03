import './RecipeList.css'
import {
  Flex,
  VStack,
} from '@chakra-ui/react';
import DynamicGrid from './DynamicGrid';

function DinnerList(props) {
  const {onNavigate, recipe_list, set_recipe, loading} = props

  return (
    <Flex className='Flex'>
      <VStack className = 'main-stack'>
        <div className="title-container">
          <ul className="title-list">
            <li className="title-list-item">Dinner</li>
            <li className="title-list-item">晚餐</li>
            <li className="title-list-item">रात का खाना</li>
            <li className="title-list-item">Cena</li>
            <li className='title-list-item'>Dîner</li>
          </ul>
          <div className="title-text">
            Recipes
          </div>
        </div>
        <DynamicGrid recipe_list={recipe_list} onNavigate={onNavigate} set_recipe={set_recipe} isLoading={!loading} />
      </VStack>
    </Flex>
  );
}

export default DinnerList;
