/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call comment function when comment button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // arrange
    render(<CommentInput comment={() => {}} />);
    const commentInput = await screen.getByRole('textbox');

    // action
    await userEvent.type(commentInput, 'inicomment');

    // assert
    expect(commentInput).toHaveValue('inicomment');
  });

  it('should call comment function when comment button is clicked', async () => {
    // arrange
    const comment = vi.fn();
    render(<CommentInput comment={comment} />);
    const commentInput = await screen.getByRole('textbox');
    await userEvent.type(commentInput, 'inicomment');
    const commentButton = await screen.getByRole('button', { name: 'Kirim' });

    // action
    await userEvent.click(commentButton);

    // assert
    expect(comment).toBeCalledWith({
      commentValue: 'inicomment',
    });
  });
});
