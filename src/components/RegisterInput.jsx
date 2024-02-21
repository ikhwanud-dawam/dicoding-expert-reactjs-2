import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useInput from '../hooks/useInput';

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickVisibility = () => setShowPassword(!showPassword);

  return (
    <form>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          focusBorderColor="teal.400"
          value={name}
          onChange={onNameChange}
          placeholder="Username"
        />
      </FormControl>
      <FormControl mt={4} id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          focusBorderColor="teal.400"
          value={email}
          onChange={onEmailChange}
          placeholder="n@example.com"
        />
      </FormControl>
      <FormControl mt={4} id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor="teal.400"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
            placeholder="********"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickVisibility}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        w="full"
        mt="6"
        colorScheme="teal"
        variant="solid"
        type="button"
        onClick={() => register({ name, email, password })}
      >
        Sign Up
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
