import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LeaderboardUserItem from '../components/LeaderboardUserItem';

export default {
  title: 'Components/LeaderboardUserItem',
  component: LeaderboardUserItem,
};

const leaderboard = {
  user: {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  score: 10,
};

const authUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const leaderboard2 = {
  user: {
    id: 'demonaizu',
    name: 'Demonaizu',
    email: 'demonaizu@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  score: 20,
};

const authUser2 = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

export function LeaderboardUserIsAuthUser() {
  return (
    <ChakraProvider>
      <LeaderboardUserItem
        leaderboard={leaderboard}
        authUser={authUser}
      />
    </ChakraProvider>
  );
}

export function LeaderboardUserNotAuthUser() {
  return (
    <ChakraProvider>
      <LeaderboardUserItem
        leaderboard={leaderboard2}
        authUser={authUser2}
      />
    </ChakraProvider>
  );
}
