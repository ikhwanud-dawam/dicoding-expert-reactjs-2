import React from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      h="4rem"
      bg="teal.200"
      w="100%"
      position="fixed"
      top={0}
      zIndex={200}
    >
      <Heading as="h1" fontSize="3xl">
        <Link as={RouterLink} to="/" color="teal.900">
          Dicoding Forum App
        </Link>
      </Heading>
    </Flex>
  );
}
