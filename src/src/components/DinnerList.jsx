import './RecipeList.css'
import {
  Grid,
  Flex,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import RecipeItem from './RecipeItem';
import { useEffect, useRef } from 'react';

function DinnerList(props) {
  const {onNavigate, recipe_list, set_recipe} = props
  const resize_timeout = useRef(null);
  const skeleton_grid_items = [];

  for (let i = 0; i < 9; i++) {
    skeleton_grid_items.push(<GridItem key={i} className='skeleton-grid-item' />);
  }

  useEffect(() => {
    const recipe_items = document.querySelectorAll(".recipe-item")
    const grid = document.querySelector(".grid")
    const grid_items = Array.from(grid.children)

    // Function to get the positions of each skeleton grid item
    function getGridItemBound() {
      return grid_items.map(item => item.getBoundingClientRect())
    }

    // Function that makes the recipe item follow the trajactory of
    // the skeleton grid item.
    function animateRecipeItems(initialBounds, finalBounds) {
      recipe_items.forEach((item, index) => {
        const initial = initialBounds[index]
        const final = finalBounds[index]

        const deltaX =  initial.left - final.left
        const deltaY =  initial.top - final.top
        
        item.animate(
          [
            {transform: `translate(${deltaX}px, ${deltaY}px)`},
            {transform: 'none'}
          ],
          {
            duration: 500,
            easing: 'ease-in-out',
            fill: 'both'
          }
        )
        item.style.left = `${final.left}px`
        item.style.top = `${final.top-100}px`
      })
    }

    // Check the initial positions of each skeleton grid item
    let initialBounds = getGridItemBound()

    const first_position = initialBounds.map(() => initialBounds[0])

    // Replicate the position of the skeleton grid item to the recipe item
    animateRecipeItems(first_position, initialBounds)

     // Function to handle resize with debounce
    function handleResize() {
      if (resize_timeout.current) {
        clearTimeout(resize_timeout.current);
      }
      resize_timeout.current = setTimeout(() => {
        const finalBounds = getGridItemBound();
        animateRecipeItems(initialBounds, finalBounds);
        initialBounds = finalBounds;
      }, 400);
    }

     window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [recipe_list])

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
        <div className='container'>
          <Grid className='grid'>
            {recipe_list.length > 0 ?
              recipe_list.map((_, index) => {
                return(
                  <GridItem className='grid-item' key={index}/>
                )
              }) : null
            }
          </Grid>
          {recipe_list.length > 0 ? 
            recipe_list.map((recipe, index) => {
              return (
                <div 
                  className='recipe-item' 
                  key={index}
                  onClick={() => {
                    set_recipe(recipe);
                    onNavigate('Recipe');
                  }}
                >
                  <RecipeItem recipe={recipe} />
                </div>
              )}) : null
          }
          {/* <Grid className='skeleton-grid'>
            {skeleton_grid_items}
          </Grid> */}
        </div>
      </VStack>
    </Flex>
  );
}

export default DinnerList;
