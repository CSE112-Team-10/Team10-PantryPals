import { Box, Select, Stack, HStack } from '@chakra-ui/react';
import RecipeList from './RecipeList';

function Sidebar() {
  return (
    <Stack spacing={2} width='100%' overflowY='auto'>
      <HStack>
        <Select flex='3' variant='outline' placeholder='Filter' size='sm'>
          <option value='option1'>Breakfast</option>
          <option value='option2'>Lunch</option>
          <option value='option3'>Dinner</option>
        </Select>
        <Select flex='4' variant='outline' placeholder='Sort' size='sm'>
          <option value='option1'>Newest</option>
          <option value='option2'>Oldest</option>
          <option value='option3'>Alphabetically</option>
        </Select>
      </HStack>
      <Box>
        <RecipeList></RecipeList>
      </Box>
    </Stack>
  );
}

export default Sidebar;
