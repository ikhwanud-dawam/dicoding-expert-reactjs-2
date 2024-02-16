import {
  Box,
  Container,
  Heading,
  IconButton,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import asyncPopulateThreadAndUsers from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import ChipsList from '../components/ChipsList';
import {
  asyncNeutralizeThreadVote,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action';

function Homepage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadAndUsers());
  }, [dispatch]);

  const chipsList = threads.map((thread) => ({
    id: thread.id,
    category: thread.category,
  }));

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const onUpvoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onNeutralizeVoteThread = (threadId) => {
    dispatch(asyncNeutralizeThreadVote(threadId));
  };

  return (
    <Box as="main" w="auto" py="5rem">
      <Container as="section" maxW="5xl">
        <Box as="header">
          <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem">
            Kategori Popular
          </Heading>
          <ChipsList
            chips={chipsList}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </Box>
        <Box>
          <Heading as="h2" fontSize="3xl" color="teal.900" mt="1rem">
            Diskusi Tersedia
          </Heading>
          <ThreadsList
            threads={threadList}
            authUserId={authUser.id}
            upVote={onUpvoteThread}
            downVote={onDownVoteThread}
            neutralizeVote={onNeutralizeVoteThread}
          />
        </Box>
        <ChakraLink as={Link} to="/add" position="fixed" bottom={90} right={30}>
          <IconButton
            isRound
            size="lg"
            aria-label="Add thread"
            colorScheme="teal"
            icon={<AddIcon />}
          />
        </ChakraLink>
      </Container>
    </Box>
  );
}

export default Homepage;
