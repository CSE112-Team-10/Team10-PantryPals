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
  Image,
  OrderedList,
  ListItem,
  Box,
  HStack,
  VStack,
  Stack
} from '@chakra-ui/react';
import React from 'react';

function Recipe({ isOpen, onClose, recipe }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent margin="20px" maxWidth="95%" maxHeight="95%" borderRadius='2%' backgroundColor='#F2E8DE'>
        <ModalCloseButton />
        <ModalBody>
          <HStack align="center">
            <VStack align="start" spacing={4} flex="1">
              <Text align='left' fontSize='50px' fontWeight={700}>
                {recipe.name}
              </Text>
              <Text align='left' fontSize='18px' fontWeight={500}>
                Servings: {recipe.servings} | Difficulty: {recipe.difficulty} | Time: {recipe.time}
              </Text>
              <Text fontSize='18px' fontWeight={500}>
                Ingredients:
              </Text>
              <VStack align="start" spacing={1}>
                {recipe.ingredients.map((ingredient, index) => (
                  <Text fontSize='16px' key={index}>
                    • {ingredient}
                  </Text>
                ))}
              </VStack>
              <Text fontSize='18px' fontWeight={500} mt='1rem'>
                Instructions:
              </Text>
              <OrderedList spacing={2} mt='0.5rem'>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index}>{instruction}</ListItem>
                ))}
              </OrderedList>
            </VStack>
            <Box maxW='sm' borderWidth='10px' borderRadius='lg' overflow='hidden' margin='59px' borderColor='#A58375'>
              <Image src={recipe.image} alt={recipe.name} objectFit="cover" boxSize={'400px'}/>
            </Box>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' width={'200px'} margin={'5px'}>
            Regenerate
          </Button>
          <Button colorScheme='red' onClick={onClose}width={'200px'} margin={'5px'}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Recipe;
