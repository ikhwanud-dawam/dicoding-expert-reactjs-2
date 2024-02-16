import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
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

export default function CommentItem({
  comment,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const {
    id, content, createdAt, owner, upVotesBy, downVotesBy,
  } = comment;

  const [upVoteIsActive, setUpVoteSetActive] = useState(
    upVotesBy.includes(authUserId),
  );
  const [downVoteIsActive, setDownVoteSetActive] = useState(
    downVotesBy.includes(authUserId),
  );

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

  return (
    <CardBody m={-2}>
      <Card bg="teal.50">
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="center" gap={2}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            <Heading as="p" fontSize="lg">
              {owner.name}
            </Heading>
          </Flex>
          <Text>{postedAt(createdAt)}</Text>
        </CardHeader>
        <CardBody mt={-5}>
          <Text as="div">{parse(content)}</Text>
        </CardBody>
        <CardFooter>
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
              leftIcon={
                downVoteIsActive ? <FaThumbsDown /> : <FaRegThumbsDown />
              }
              aria-label="Downvote Button"
              onClick={() => onDownvoteHandleClick()}
            >
              <Text>{downVotesBy.length}</Text>
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </CardBody>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  comment: PropTypes.shape(commentItemShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export { userShape, commentItemShape };
