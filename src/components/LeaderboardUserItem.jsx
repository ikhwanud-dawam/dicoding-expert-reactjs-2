import React from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function LeaderboardUserItem({ leaderboard, authUser }) {
  const { user, score } = leaderboard;

  return (
    <Flex justify="space-between">
      <Flex gap={3} align="center">
        <Avatar name={user.name} src={user.avatar} />
        {authUser.id === user.id ? (
          <Text color="red">
            {user.name}
            {' '}
            (you)
          </Text>
        ) : (
          <Text>{user.name}</Text>
        )}
      </Flex>
      <Text>{score}</Text>
    </Flex>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardUserItem.propTypes = {
  leaderboard: PropTypes.shape(leaderboardShape).isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
};
