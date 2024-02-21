/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByRole('textbox', { name: 'Email address' });

    // action
    await userEvent.type(emailInput, 'email@gmail.com');

    // assert
    expect(emailInput).toHaveValue('email@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('********');

    // action
    await userEvent.type(passwordInput, 'inipasswordtest');

    // assert
    expect(passwordInput).toHaveValue('inipasswordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByRole('textbox', { name: 'Email address' });
    await userEvent.type(emailInput, 'email@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('********');
    await userEvent.type(passwordInput, 'inipasswordtest');
    const loginButton = await screen.getByRole('button', { name: 'Sign In' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'email@gmail.com',
      password: 'inipasswordtest',
    });
  });
});
