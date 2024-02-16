import React from 'react';
import {
  Box, Button, CardBody, Heading, Textarea,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function CommentInput({ comment }) {
  const [commentValue, setCommentValue, setValue] = useInput();

  return (
    <Box>
      <CardBody>
        <Heading as="h3" fontSize="xl" mb={2}>
          Beri Komentar
        </Heading>
        <Textarea
          bg="teal.50"
          focusBorderColor="teal.400"
          value={commentValue}
          onChange={setCommentValue}
        />
        <Button
          w="full"
          size="md"
          mt={2}
          colorScheme="teal"
          variant="solid"
          type="button"
          onClick={() => {
            comment({ commentValue });
            setValue('');
          }}
        >
          Kirim
        </Button>
      </CardBody>
    </Box>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
};
