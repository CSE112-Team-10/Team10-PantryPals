import './RecipeList.css'
import {
  Grid,
  Flex,
  VStack,
  GridItem,
} from '@chakra-ui/react';
import RecipeItem from './RecipeItem';
import { useEffect, useRef } from 'react';
import DynamicGrid from './DynamicGrid';

function LunchList(props) {
  const {onNavigate, recipe_list, set_recipe} = props
  // const resize_timeout = useRef(null);
  // const skeleton_grid_items = [];

  // for (let i = 0; i < 9; i++) {
  //   skeleton_grid_items.push(<GridItem key={i} className='skeleton-grid-item' />);
  // }

  // useEffect(() => {
  //   const recipe_items = document.querySelectorAll(".recipe-item")
  //   const grid = document.querySelector(".grid")
  //   const grid_items = Array.from(grid.children)
  //   const container = document.querySelector('.container');

  //   // Function to get the positions of each skeleton grid item
  //   function getGridItemBound() {
  //     return grid_items.map(item => item.getBoundingClientRect());
  //   }

  //   function getRecipeItemBound() {
  //     return Array.from(recipe_items).map(item => item.getBoundingClientRect());
  //   }

  //   // Function that makes the recipe item follow the trajactory of
  //   // the skeleton grid item.
  //   function animateRecipeItems(initialBounds, finalBounds) {
  //     const scrollLeft = container.scrollLeft;
  //     const scrollTop = container.scrollTop;

  //     recipe_items.forEach((item, index) => {
  //       const initial = initialBounds[index]
  //       const final = finalBounds[index]

  //       const deltaX =  initial.left - final.left
  //       const deltaY =  initial.top - final.top
        
  //       item.animate(
  //         [
  //           {transform: `translate(${deltaX}px, ${deltaY}px)`},
  //           {transform: 'none'}
  //         ],
  //         {
  //           duration: 500,
  //           easing: 'ease-in-out',
  //           fill: 'both'
  //         }
  //       )
  //       item.style.left = `${final.left + scrollLeft}px`
  //       item.style.top = `${final.top + scrollTop}px`
  //     })
  //   }

  //   let initialBounds = getRecipeItemBound();
  //   const finalBounds = getGridItemBound();

  //   animateRecipeItems(initialBounds, finalBounds);
    
  //    // Function to handle resize with debounce
  //   function handleResize() {
  //     if (resize_timeout.current) {
  //       clearTimeout(resize_timeout.current);
  //     }
  //     resize_timeout.current = setTimeout(() => {
  //       initialBounds = getRecipeItemBound();
  //       const finalBounds = getGridItemBound();
  //       animateRecipeItems(initialBounds, finalBounds);
  //     }, 400);
  //   }

  //   window.addEventListener('resize', handleResize);
    
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [recipe_list])

  return (
    <Flex className='Flex'>
      <VStack className = 'main-stack'>
        <div className="title-container">
          <ul className="title-list">
            <li className="title-list-item">Lunch</li>
            <li className="title-list-item">午餐</li>
            <li className="title-list-item">दिन का खाना</li>
            <li className="title-list-item">Almuerza</li>
            <li className='title-list-item'>Déjeuner</li>
          </ul>
          <div className="title-text">
            Recipes
          </div>
        </div>
        {/* <div className='container'>
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
        </div> */}
        <DynamicGrid recipe_list={recipe_list} />
      </VStack>
    </Flex>
  );
}

export default LunchList;
