import { Link, Navigate } from 'react-router-dom';
import {
  Heading, Text, Link as ChakraLink, Flex, Box,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import { asyncPreloadProcess } from '../states/isPreload/action';

function Login() {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <Flex
      as="section"
      w="full"
      align="center"
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="full"
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading fontSize="2xl" mb={4} textAlign="center">
          Sign In
        </Heading>
        <LoginInput login={onLogin} />
        <Text mt={4} textAlign="center">
          <ChakraLink as={Link} to="/register" color="teal.500">
            Create new account?
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
