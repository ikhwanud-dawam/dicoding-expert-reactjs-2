import React from 'react';
import {
  AbsoluteCenter, Box, Divider, Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { commentItemShape } from './CommentItem';

export default function CommentSection({
  commentList,
  comment,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  return (
    <>
      <CommentInput comment={comment} />
      <Box position="relative" my={5}>
        <Divider borderColor="teal.500" />
        <AbsoluteCenter px="4" bg="teal.100">
          <Heading as="h3" fontSize="xl" color="teal.900">
            Komentar (
            {commentList.length}
            )
          </Heading>
        </AbsoluteCenter>
      </Box>
      <CommentList
        commentList={commentList}
        upVote={upVote}
        downVote={downVote}
        neutralizeVote={neutralizeVote}
        authUserId={authUserId}
      />
    </>
  );
}

CommentSection.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  comment: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};
