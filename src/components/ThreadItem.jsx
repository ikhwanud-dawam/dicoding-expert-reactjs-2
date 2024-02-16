import PropTypes from 'prop-types';
import {
  Card,
  Heading,
  Tag,
  Text,
  Flex,
  Icon,
  CardHeader,
  CardBody,
  CardFooter,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
  FaRegComment,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import postedAt from '../utils/index';

export default function ThreadItem({
  thread,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const {
    id, title, body, category, createdAt, user, upVotesBy, downVotesBy, totalComments,
  } = thread;

  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

  const navigate = useNavigate();

  const onUpvoteHandleClick = () => {
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setUpVoteSetActive(false);
    } else {
      upVote(id);
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = () => {
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote(id);
      setDownVoteSetActive(false);
    } else {
      downVote(id);
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <Card size="md" mt="1rem" bg="teal.100">
      <CardHeader as="header">
        <Tag
          size="md"
          bg="teal.200"
          color="teal.900"
          variant="solid"
          borderRadius="full"
        >
          <Text fontSize="xs">
            #
            {category}
          </Text>
        </Tag>
        <Heading color="teal.900">
          <ChakraLink as={Link} onClick={onThreadClick}>{title}</ChakraLink>
        </Heading>
      </CardHeader>
      <CardBody mt={-5} fontSize="md" color="teal.900">
        <Text as="div" noOfLines={3}>
          {parse(body)}
        </Text>
      </CardBody>
      <CardFooter as="footer" justify="space-between" gap={15}>
        <Flex gap={2} align="center">
          <Button
            colorScheme="teal"
            isActive={upVoteIsActive}
            leftIcon={upVoteIsActive ? <FaThumbsUp /> : <FaRegThumbsUp />}
            aria-label="Upvote Button"
            onClick={() => onUpvoteHandleClick()}
          >
            <Text>{upVotesBy.length}</Text>
          </Button>
          <Button
            colorScheme="teal"
            isActive={downVoteIsActive}
            leftIcon={downVoteIsActive ? <FaThumbsDown /> : <FaRegThumbsDown />}
            aria-label="Downvote Button"
            onClick={() => onDownvoteHandleClick()}
          >
            <Text>{downVotesBy.length}</Text>
          </Button>
          <Icon as={FaRegComment} boxSize={5} />
          <Text>{totalComments}</Text>
        </Flex>
        <Flex gap={5}>
          <Text>{postedAt(createdAt)}</Text>
          <Text>
            Dibuat oleh
            {' '}
            <Heading as="span" fontSize="1rem">
              {user.name}
            </Heading>
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadsItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  thread: PropTypes.shape(threadsItemShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export { threadsItemShape };
