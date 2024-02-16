import {
  Avatar,
  Box,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import postedAt from '../utils/index';

export default function ThreadDetailItem({
  threadDetail,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  if (!threadDetail) return null;

  const {
    title, body, category, createdAt, owner, upVotesBy, downVotesBy,
  } = threadDetail;

  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

  const onUpvoteHandleClick = () => {
    if (upVotesBy.includes(authUserId)) {
      neutralizeVote();
      setUpVoteSetActive(false);
    } else {
      upVote();
      setUpVoteSetActive(true);
      setDownVoteSetActive(false);
    }
  };

  const onDownvoteHandleClick = () => {
    if (downVotesBy.includes(authUserId)) {
      neutralizeVote();
      setDownVoteSetActive(false);
    } else {
      downVote();
      setDownVoteSetActive(true);
      setUpVoteSetActive(false);
    }
  };

  return (
    <>
      <CardHeader as="header">
        <Tag
          size="lg"
          bg="teal.200"
          color="teal.900"
          variant="solid"
          borderRadius="full"
          mb={2}
        >
          <Text fontSize="s">
            #
            {category}
          </Text>
        </Tag>
        <Heading as="h2" size="2xl" color="teal.900">
          {title}
        </Heading>
      </CardHeader>
      <CardBody fontSize="md" color="teal.900" mt={-5}>
        <Text as="div" fontSize="xl" noOfLines={3}>
          {parse(body)}
        </Text>
      </CardBody>
      <CardFooter as="footer" justify="space-between" gap={15} fontSize="lg">
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
        </Flex>
        <Flex alignItems="center" gap={5}>
          <Text>{postedAt(createdAt)}</Text>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            Dibuat oleh
            {' '}
            <Heading as="span" fontSize="lg">
              {owner.name}
            </Heading>
          </Box>
        </Flex>
      </CardFooter>
    </>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadDetail = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetailItem.propTypes = {
  threadDetail: PropTypes.shape(threadDetail).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};
