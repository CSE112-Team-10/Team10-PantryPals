import {
    Box,
    Text,
    Flex,
    Container,
    Stack,
    HStack,
    Button,
  } from '@chakra-ui/react';
import '../pages/styles.css';


function Load() {
    return (
        <Flex align='center' justify='center' width='full' height='full'>
            <Container centerContent>
                <Stack>
                    <img src="/loading.gif" width="300"/>
                    <Text 
                    color='#856454' 
                    className='title'
                    align='center'
                    marginTop='20px'
                    fontSize='30px'
                    fontWeight={750}>
                        Generating...
                    </Text>
                </Stack>
            </Container>
            
        </Flex>
    )
}

export default Load;