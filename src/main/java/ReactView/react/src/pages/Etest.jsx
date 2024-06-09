import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'

import Recipe from '../components/Recipe';
import recipes from '../recipes.json';
function TestPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
      <div>
        {recipes.recipes.map((recipe, index) => (
          <Button key={index} onClick={() => handleOpen(recipe)}>
            Show {recipe.name} Recipe
          </Button>
        ))}
        {selectedRecipe && (
          <Recipe isOpen={isModalOpen} onClose={handleClose} recipe={selectedRecipe} />
        )}
      </div>
  );
}

export default TestPage;