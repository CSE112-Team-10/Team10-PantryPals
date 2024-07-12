import './DynamicGrid.css'
import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import RecipeItem from './RecipeItem';
import { useEffect, useRef } from 'react';

function DynamicGrid({recipe_list, grid_class, grid_item_class}) {
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

    // function applyEntranceAnimation() {
    //   const dimention = grid.getClientRects()
    //   const width = dimention[0].width / 350
    //   const height = dimention[0].height / 200
    //   const num_of_items = width * height
    //   for(let i = 0; i < num_of_items; i++) {
    //     if (i < recipe_items.length) {
    //       recipe_items[i].style.animationDuration = `${0.4 + i * 0.2}s`
    //     }
    //   }
    // }

    // // Apply fade in animation on upon opening page
    // applyEntranceAnimation()

    // Check the initial positions of each skeleton grid item
    let initialBounds = getGridItemBound()

    // Replicate the position of the skeleton grid item to the recipe item
    initialBounds.forEach((bound, index) => {
      recipe_items[index].style.left = `${bound.left}px`
      recipe_items[index].style.top = `${bound.top-100}px`
    })

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
    isLoading ? 
        <div className='container'>
          <Grid className={grid_class}>
            {recipe_list.length > 0 ?
              recipe_list.map((_, index) => {
                return(
                  <GridItem className={grid_item} key={index}/>
                )
              })
              :
              null
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
              )
            })
            :
            null
          }
        </div>
        :
        <div className='skeleton-grid'>
            <Grid className='skeleton-grid'>
                {skeleton_grid_items}
            </Grid>
        </div>
  );
}

export default DynamicGrid;
