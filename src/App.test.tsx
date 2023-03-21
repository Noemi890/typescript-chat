import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders singIn', () => {
  render(<App />)
  const signInButton = screen.getByTestId("signInWithGoogle")
  expect(signInButton).toBeInTheDocument();
})