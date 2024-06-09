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
  Stack,
} from '@chakra-ui/react';
import React from 'react';

function Recipe({ isOpen, onClose, recipe }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent
        overflowY='scroll'
        margin='20px'
        maxWidth='95%'
        maxHeight='95%'
        borderRadius='2%'
        backgroundColor='#F2E8DE'>
        <ModalCloseButton />
        <ModalBody>
          <HStack align='center'>
            <VStack align='start' spacing={2} flex='1'>
              <Text
                align='left'
                fontSize='60px'
                fontWeight={1000}
                color={'#A58375'}
                className='title'>
                {recipe.name}
              </Text>
              <HStack
                align='left'
                fontSize='18px'
                fontWeight={500}
                color='#A58375'>
                <Text
                  fontSize='20px'
                  fontWeight={7}
                  color={'#A58375'}
                  className='title'>
                  Servings:
                </Text>
                <Text>{recipe.servings}</Text>
                <Text
                  fontSize='20px'
                  fontWeight={7}
                  color={'#A58375'}
                  className='title'>
                  Difficulty:
                </Text>
                <Text>{recipe.difficulty}</Text>
                <Text
                  fontSize='20px'
                  fontWeight={7}
                  color={'#A58375'}
                  className='title'>
                  Time:
                </Text>
                <Text>{recipe.time}</Text>
              </HStack>
              <Text
                fontSize='28px'
                fontWeight={500}
                color={'#A58375'}
                className='title'>
                Ingredients:
              </Text>
              <VStack align='start' color={'#A58375'}>
                {recipe.ingredients.map((ingredient, index) => (
                  <HStack>
                    <Text
                      fontSize='20px'
                      fontWeight={7}
                      color={'#A58375'}
                      className='title'>
                      •
                    </Text>
                    <Text fontSize='18px' key={index}>
                      {ingredient}
                    </Text>
                  </HStack>
                ))}
              </VStack>
              <Text
                fontSize='28px'
                fontWeight={500}
                mt='1rem'
                color={'#A58375'}
                className='title'>
                Instructions:
              </Text>
              <OrderedList mt='0.5rem'>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index} color={'#A58375'} fontSize='18px'>
                    {instruction}
                  </ListItem>
                ))}
              </OrderedList>
            </VStack>
            <VStack>
              <Box
                maxW='sm'
                borderWidth='15px'
                borderRadius='lg'
                overflow='hidden'
                margin='59px'
                borderColor='#A58375'>
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  objectFit='cover'
                  boxSize={'400px'}
                />
              </Box>
              <HStack marginTop='-50'>
                <Button
                  colorScheme='green'
                  onClick={onClose}
                  width={'200px'}
                  margin={'5px'}>
                  Save
                </Button>
                <Button colorScheme='red' width={'200px'} margin={'5px'}>
                  Regenerate
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Recipe;
