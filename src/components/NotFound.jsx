import React from 'react';
import {
  Flex, Heading, Text, Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      h="100vh"
      textAlign="center"
    >
      <Heading fontSize="6xl" color="teal.500">
        404
      </Heading>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Oops! Halaman tidak ditemukan.
      </Text>
      <Text fontSize="lg" mb={8}>
        Sepertinya Anda tersesat. Silakan kembali ke
        {' '}
        <ChakraLink as={Link} to="/" color="teal.500">
          halaman utama
        </ChakraLink>
        {' '}
        atau coba halaman lain.
      </Text>
    </Flex>
  );
}
