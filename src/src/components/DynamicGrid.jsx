import './DynamicGrid.css'
import RecipeItem from './RecipeItem';
import { useEffect, useRef } from 'react';

function DynamicGrid({recipe_list, onNavigate, set_recipe, isLoading=false}) {
  const resize_timeout = useRef(null);

  const skeleton_grid_items = Array.from({ length: 9 }, (_, i) => (
    <div key={i} className="skeleton-grid-item" />
  ));

  useEffect(() => {

    if(!isLoading) {
      const recipe_items = document.querySelectorAll(".recipe-item")
      const grid = document.querySelector(".grid")
      const grid_items = Array.from(grid.children)
      const container = document.querySelector('.container');
      const containerDimension = container.getBoundingClientRect();

      // Function to get the positions of each skeleton grid item
      function getGridItemBound() {
        return grid_items.map(item => item.getBoundingClientRect());
      }

      function getRecipeItemBound() {
        return Array.from(recipe_items).map(item => item.getBoundingClientRect());
      }

      // Function that makes the recipe item follow the trajactory of
      // the skeleton grid item.
      function animateRecipeItems(initialBounds, finalBounds) {
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;
        
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
          item.style.left = `${final.left + scrollLeft - containerDimension.left }px`
          item.style.top = `${final.top + scrollTop - containerDimension.top}px`
        })
      }

      let initialBounds = getRecipeItemBound();
      const finalBounds = getGridItemBound();

      animateRecipeItems(initialBounds, finalBounds);

      // Function to handle resize with debounce
      function handleResize() {
        if (resize_timeout.current) {
          clearTimeout(resize_timeout.current);
        }
        resize_timeout.current = setTimeout(() => {
          initialBounds = getRecipeItemBound();
          const finalBounds = getGridItemBound();
          animateRecipeItems(initialBounds, finalBounds);
        }, 400);
      }

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [recipe_list])

  return (
    !isLoading ? 
      <div className='container'>
          <div className='grid'>
            {recipe_list.length > 0 && recipe_list.map((_, index) => (
              <div className="grid-item" key={index} />
            ))}
          </div>
          {recipe_list.length > 0 && recipe_list.map((recipe, index) => (
            <div 
              className="recipe-item" 
              key={index}
              onClick={() => {
                set_recipe(recipe);
                onNavigate('Recipe');
              }}
            >
              <RecipeItem recipe={recipe} />
            </div>
          ))}
      </div>
        :
      <div className='container'>
        <div className='skeleton-grid'>
          {skeleton_grid_items}
        </div>
      </div>
  );
}

export default DynamicGrid;
