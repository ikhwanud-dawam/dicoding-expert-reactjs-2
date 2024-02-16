import React from 'react';
import {
  Button, Flex, ButtonGroup, Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChatIcon } from '@chakra-ui/icons';
import { MdOutlineLeaderboard, MdLogout } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function Navigation({ signOut }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      w="100%"
      h="4rem"
      bg="teal.900"
      position="fixed"
      bottom={0}
      zIndex={200}
    >
      <ButtonGroup>
        <ChakraLink to="/" as={Link}>
          <Button leftIcon={<ChatIcon />} bg="teal.50">
            Thread
          </Button>
        </ChakraLink>
        <ChakraLink to="/leaderboards" as={Link}>
          <Button leftIcon={<MdOutlineLeaderboard />} bg="teal.50">
            Leaderboards
          </Button>
        </ChakraLink>
        <ChakraLink as={Link}>
          <Button
            leftIcon={<MdLogout />}
            bg="teal.50"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </ChakraLink>
      </ButtonGroup>
    </Flex>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
};
