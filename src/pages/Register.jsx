import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Heading, Text, Link as ChakraLink, Flex, Box,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { asyncRegisterUser } from '../states/users/action';

function Register() {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onRegister = ({ name, email, password }) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(asyncRegisterUser({
      name, email, password, successCallback,
    }));
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
          Create an account
        </Heading>
        <RegisterInput register={onRegister} />
        <Text mt={4} textAlign="center">
          Already have an account?
          {' '}
          <ChakraLink as={Link} to="/login" color="teal.500">
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
