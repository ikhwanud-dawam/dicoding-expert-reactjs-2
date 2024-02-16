import React from 'react';
import { Box } from '@chakra-ui/react';
import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <Box position="sticky" top={0} zIndex={9999}>
      <LoadingBar
        style={{
          backgroundColor: '#1D4044',
        }}
      />
    </Box>
  );
}
