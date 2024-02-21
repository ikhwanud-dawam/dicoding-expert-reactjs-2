import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

export default {
  title: 'Components/Header',
  component: Header,
};

export function Default() {
  return (
    <ChakraProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ChakraProvider>
  );
}
