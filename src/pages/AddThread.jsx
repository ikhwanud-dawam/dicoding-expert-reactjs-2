import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddThreadInput from '../components/AddThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreate = ({ title, body, category }) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(asyncAddThread({
      title, body, category, successCallback,
    }));
  };

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        <Box as="header">
          <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem" mb={6}>
            Buat diskusi baru
          </Heading>
        </Box>
        <AddThreadInput addThread={onCreate} />
      </Container>
    </Box>
  );
}

export default AddThread;
