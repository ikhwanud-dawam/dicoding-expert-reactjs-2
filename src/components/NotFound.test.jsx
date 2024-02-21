/**
 * skenario testing
 *
 * - NotFound component
 *   - redirects to the homepage when the link is clicked
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('redirects to the homepage when the link is clicked', () => {
    // arrange
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    // action
    fireEvent.click(screen.getByRole('link', { name: 'halaman utama' }));

    // assert
    expect(window.location.pathname).toBe('/');
  });
});
