/**
 * skenario testing
 *
 * - AddThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when addThread button is clicked
 */

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import AddThreadInput from './AddThreadInput';

expect.extend(matchers);

describe('AddThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Judul');

    // action
    await userEvent.type(titleInput, 'inititle');

    // assert
    expect(titleInput).toHaveValue('inititle');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Kategori');

    // action
    await userEvent.type(categoryInput, 'inikategori');

    // assert
    expect(categoryInput).toHaveValue('inikategori');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(<AddThreadInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Isi');

    // action
    await userEvent.type(bodyInput, 'iniisibody');

    // assert
    expect(bodyInput).toHaveValue('iniisibody');
  });

  it('should call addThread function when addThread button is clicked', async () => {
    // arrange
    const mockAddThread = vi.fn();
    render(<AddThreadInput addThread={mockAddThread} />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, 'inititle');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'inikategori');
    const bodyInput = await screen.getByPlaceholderText('Isi');
    await userEvent.type(bodyInput, 'iniisibody');
    const addThreadButton = await screen.getByRole('button', { name: 'Buat' });

    // action
    await userEvent.click(addThreadButton);

    // assert
    expect(mockAddThread).toBeCalledWith({
      title: 'inititle',
      body: 'iniisibody',
      category: 'inikategori',
    });
  });
});
