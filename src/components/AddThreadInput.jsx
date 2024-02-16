import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Input, Stack, Textarea,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

export default function AddThreadInput({ addThread }) {
  const [title, setTitleChange] = useInput('');
  const [category, setCategoryChange] = useInput('');
  const [body, setBodyChange] = useInput('');

  return (
    <Box as="form">
      <Stack>
        <Input
          focusBorderColor="teal.400"
          placeholder="Judul"
          value={title}
          onChange={setTitleChange}
        />
        <Input
          focusBorderColor="teal.400"
          placeholder="Kategori"
          value={category}
          onChange={setCategoryChange}
        />
        <Textarea
          focusBorderColor="teal.400"
          placeholder="Isi"
          value={body}
          onChange={setBodyChange}
        />
      </Stack>
      <Button
        w="full"
        mt="6"
        colorScheme="teal"
        variant="solid"
        type="button"
        onClick={() => addThread({ title, body, category })}
      >
        Buat
      </Button>
    </Box>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
