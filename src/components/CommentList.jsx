import React from 'react';
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

export default function CommentList({
  commentList,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  return (
    <Flex direction="column">
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          authUserId={authUserId}
          comment={comment}
        />
      ))}
    </Flex>
  );
}

CommentList.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};
