import {
  Box, Card, Container, Divider,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadDetailItem from '../components/ThreadDetailItem';
import CommentSection from '../components/CommentSection';
import {
  asyncAddThreadComment,
  asyncNeutralizeVoteComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
} from '../states/threadDetail/action';

function DetailPage() {
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onComment = ({ commentValue }) => {
    dispatch(asyncAddThreadComment({ threadId: id, commentValue }));
  };

  const onUpvoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };

  const onNeutralizeVoteThread = () => {
    dispatch(asyncNeutralizeThreadDetailVote(id));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
  };

  const onNeutralizeVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  };

  if (!threadDetail) return null;

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        <Card bg="teal.100">
          <ThreadDetailItem
            upVote={onUpvoteThread}
            downVote={onDownVoteThread}
            neutralizeVote={onNeutralizeVoteThread}
            authUserId={authUser.id}
            threadDetail={threadDetail}
          />
          <Divider color="teal.500" />
          <CommentSection
            comment={onComment}
            upVote={onUpvoteComment}
            downVote={onDownVoteComment}
            neutralizeVote={onNeutralizeVoteComment}
            authUserId={authUser.id}
            commentList={threadDetail.comments}
          />
        </Card>
      </Container>
    </Box>
  );
}

export default DetailPage;
