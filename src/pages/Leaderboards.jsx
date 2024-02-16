import {
  Box, Container, Flex, Heading, Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardUserItem from '../components/LeaderboardUserItem';

function Leaderboards() {
  const { authUser, leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem">
          Klasmen Pengguna Aktif
        </Heading>
        <Flex as="header" mt={5} justify="space-between" fontSize="1.5rem">
          <Text>Pengguna</Text>
          <Text>Score</Text>
        </Flex>
        <Flex mt={2} direction="column" gap={2} fontSize="1.5rem">
          {leaderboards.map((leaderboard) => (
            <LeaderboardUserItem
              key={leaderboard.user.id}
              leaderboard={leaderboard}
              authUser={authUser}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default Leaderboards;
