import './RecipeList.css'
import {
  Grid,
  Text,
  Flex,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import RecipeItem from './RecipeItem';
import { useEffect, useRef } from 'react';

function LunchList(props) {
  const {onNavigate, lunch_list, set_recipe} = props
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const individual_items = document.querySelectorAll(".recipe-item")
    const grid_container = document.querySelector(".recipe-grid")
    const grid_items = Array.from(grid_container.children)

    function getGridItemBound() {
      return grid_items.map(item => item.getBoundingClientRect())
    }

    function animateGridItems(initialBounds, finalBounds) {
      individual_items.forEach((item, index) => {
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

    let initialBounds = getGridItemBound()

    initialBounds.forEach((bound, index) => {
      individual_items[index].style.left = `${bound.left}px`
      individual_items[index].style.top = `${bound.top-100}px`
    })

     // Function to handle resize with debounce
    function handleResize() {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        const finalBounds = getGridItemBound();
        animateGridItems(initialBounds, finalBounds);
        initialBounds = finalBounds;
      }, 400);
    }

     window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [lunch_list])

  return (
    <Flex className='Flex'>
      <VStack className = 'main-stack'>
        <Text className='title'>
          Lunch Recipes
        </Text>
        <div className='container'>
          <Grid className='recipe-grid'>
              {lunch_list.length > 0 ?
                lunch_list.map((recipe, index) => {
                  return(
                    <GridItem className='recipe-grid-item' key={index}/>
                  )
                }) : null
              }
            </Grid>
            {lunch_list.length > 0 ? 
              lunch_list.map((recipe, index) => {
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
        </div>
      </VStack>
    </Flex>
  );
}

export default LunchList;
