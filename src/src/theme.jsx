import { extendTheme } from '@chakra-ui/react';

const colors = {
  background: '#F2D9BB',
};

const styles = {
  global: {
    body: {
      bg: 'background', // Apply the background color to the body
    },
  },
};

const theme = extendTheme({ colors, styles });

export default theme;
